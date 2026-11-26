import { useState, type FormEvent } from "react";
import { findAssistantEvidence, parseAssistantConfig, starterConfig, type AssistantConfig } from "@shared/assistant-config";
import "./assistant-studio.css";

const key = "portfolio-assistant-studio-v1";
type Turn = {question: string; evidence: ReturnType<typeof findAssistantEvidence>};
function initial() {
  if (typeof window === "undefined") return starterConfig;
  try {
    const fragment = new URLSearchParams(window.location.hash.slice(1)).get("assistant");
    if (fragment) return parseAssistantConfig(fragment);
    const saved = localStorage.getItem(key);
    return saved ? parseAssistantConfig(saved) : starterConfig;
  } catch { return starterConfig; }
}

export function AssistantStudio() {
  const [config,setConfig] = useState(initial);
  const [preview,setPreview] = useState<AssistantConfig>(config);
  const [question,setQuestion] = useState("");
  const [turns,setTurns] = useState<Turn[]>([]);
  const [status,setStatus] = useState("");
  const [share,setShare] = useState("");
  const [editing,setEditing] = useState(() => config.sources.length === 0);

  function apply(next: AssistantConfig) {
    const valid = parseAssistantConfig(JSON.stringify(next));
    setConfig(valid);
    setPreview(valid);
    setTurns([]);
    setShare("");
    try { localStorage.setItem(key,JSON.stringify(valid)); }
    catch { setStatus("The assistant is ready for this session. Browser storage is unavailable."); return valid; }
    setStatus("Assistant saved in this browser.");
    return valid;
  }

  function ask(text: string) {
    const clean = text.trim();
    if (!clean) return;
    setTurns([...turns,{question:clean,evidence:findAssistantEvidence(preview,clean,turns.at(-1)?.question)}]);
    setQuestion("");
  }

  function save(event: FormEvent) {
    event.preventDefault();
    try { apply(config); }
    catch (error) { setStatus(error instanceof Error ? error.message : "Could not save configuration."); }
  }

  function exportConfig() {
    try {
      const valid = apply(config);
      const blob = new Blob([JSON.stringify(valid,null,2)],{type:"application/json"});
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href=url;
      link.download="assistant-configuration.json";
      link.click();
      setTimeout(() => URL.revokeObjectURL(url),1000);
    } catch (error) { setStatus(error instanceof Error ? error.message : "Could not export configuration."); }
  }

  function makeShare() {
    try {
      const valid = apply(config);
      const url = new URL(window.location.pathname,window.location.origin);
      url.hash = new URLSearchParams({assistant:JSON.stringify(valid)}).toString();
      if (url.href.length > 8000) { setStatus("This configuration is too large for a link. Share the exported JSON instead."); return; }
      setShare(url.href);
      setStatus("Share link ready. It contains the full configuration and source text.");
    } catch (error) { setStatus(error instanceof Error ? error.message : "Could not create the link."); }
  }

  return <div className="assistant-studio">
    <section className="assistant-preview" aria-label="Assistant preview">
      <h2>{preview.name}</h2><p>{preview.description}</p>
      <div className="assistant-prompts">{preview.prompts.filter(Boolean).map((prompt,i) => <button key={i} type="button" onClick={() => ask(prompt)}>{prompt}</button>)}</div>
      <div role="log" aria-label="Conversation" className="assistant-log">{turns.map((turn,i) => <article key={i}>
        <h3>{turn.question}</h3>
        {turn.evidence.length ? <ol>{turn.evidence.map((item,j) => <li key={j}><p>{item.text}</p>{item.url ? <a href={item.url}>{item.title}</a> : <small>{item.title}</small>}</li>)}</ol> : <p>I couldn’t find a supporting passage. Try a specific keyword or add a source about this topic.</p>}
      </article>)}</div>
      <form onSubmit={event => {event.preventDefault();ask(question);}}>
        <label>Your question<input required maxLength={600} value={question} onChange={event => setQuestion(event.target.value)}/></label>
        <button disabled={!preview.sources.length || !question.trim()}>Ask</button>
      </form>
      {!preview.sources.length && <p>Add a source to start asking questions.</p>}
      {turns.length>0 && <button type="button" onClick={() => setTurns([])}>Clear conversation</button>}
    </section>
    <section className="assistant-editor">
      <button type="button" aria-expanded={editing} aria-controls="assistant-settings" onClick={() => setEditing(!editing)}>{editing ? "Hide settings" : "Customize this assistant"}</button>
      {editing && <form id="assistant-settings" onSubmit={save}>
        <h2>Assistant settings</h2>
        <label>Name<input maxLength={80} required value={config.name} onChange={event => setConfig({...config,name:event.target.value})}/></label>
        <label>Introduction<textarea maxLength={400} rows={2} value={config.description} onChange={event => setConfig({...config,description:event.target.value})}/></label>
        <label>Suggested questions, one per line<textarea maxLength={960} rows={3} value={config.prompts.join("\n")} onChange={event => setConfig({...config,prompts:event.target.value.split("\n")})}/></label>
        <h3>Knowledge sources</h3>
        <p>Paste the text you want the assistant to use. A link appears in answers as a citation.</p>
        {config.sources.map((source,index) => <fieldset key={index}><legend>Source {index+1}</legend>
          <label>Title<input maxLength={120} required value={source.title} onChange={event => setConfig({...config,sources:config.sources.map((item,i) => i===index ? {...item,title:event.target.value} : item)})}/></label>
          <label>Reference URL<input type="url" maxLength={1000} value={source.url} onChange={event => setConfig({...config,sources:config.sources.map((item,i) => i===index ? {...item,url:event.target.value} : item)})}/></label>
          <label>Source text<textarea rows={4} maxLength={10000} required value={source.text} onChange={event => setConfig({...config,sources:config.sources.map((item,i) => i===index ? {...item,text:event.target.value} : item)})}/></label>
          <button type="button" onClick={() => setConfig({...config,sources:config.sources.filter((_,i) => i!==index)})}>Remove source {index+1}</button>
        </fieldset>)}
        <div className="assistant-prompts">
          <button type="button" disabled={config.sources.length>=12} onClick={() => setConfig({...config,sources:[...config.sources,{title:"",url:"",text:""}]})}>Add source</button>
          <button>Save and preview</button>
          <button type="button" onClick={exportConfig}>Export JSON</button>
          <button type="button" onClick={makeShare}>Create share link</button>
        </div>
        <label>Import configuration<input type="file" accept=".json,application/json" onChange={async event => {
          const file=event.target.files?.[0];
          event.target.value="";
          if (!file) return;
          try {
            if (file.size>640000) throw Error("Configuration exceeds the size limit.");
            apply(parseAssistantConfig(await file.text()));
          } catch (error) { setStatus(error instanceof Error ? error.message : "Could not import configuration."); }
        }}/></label>
        {share && <label>Share link<input readOnly value={share} onFocus={event => event.target.select()}/></label>}
      </form>}
      <p role="status">{status}</p>
    </section>
  </div>;
}
