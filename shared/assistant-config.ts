export type AssistantSource = {title: string; text: string; url: string};
export type AssistantConfig = {name: string; description: string; prompts: string[]; sources: AssistantSource[]};

export const starterConfig: AssistantConfig = {
  name: "Portfolio assistant",
  description: "Ask about my work and areas of expertise.",
  prompts: ["What have you built?", "What is your professional experience?"],
  sources: [],
};

const limit = 160000;
const isText = (value: unknown, max: number): value is string =>
  typeof value === "string" && value.length <= max;

export function parseAssistantConfig(raw: string): AssistantConfig {
  if (raw.length > limit) throw Error("Configuration exceeds the size limit.");
  const value = JSON.parse(raw) as Partial<AssistantConfig> | null;
  if (!value || !isText(value.name,80) || !value.name.trim() || !isText(value.description,400) ||
      !Array.isArray(value.prompts) || value.prompts.length > 6 || !value.prompts.every(p => isText(p,160)) ||
      !Array.isArray(value.sources) || value.sources.length > 12) throw Error("Invalid assistant configuration.");
  const sources = value.sources.map(source => {
    if (!source || !isText(source.title,120) || !source.title.trim() ||
        !isText(source.text,10000) || !source.text.trim() || !isText(source.url,1000))
      throw Error("Each source needs a title and up to 10,000 characters of text.");
    if (source.url) {
      let url: URL;
      try { url = new URL(source.url); } catch { throw Error("Use an absolute HTTPS reference link."); }
      if (url.protocol !== "https:" || url.username || url.password) throw Error("Use an absolute HTTPS reference link.");
    }
    return {title:source.title.trim(),text:source.text.trim(),url:source.url};
  });
  return {name:value.name.trim(),description:value.description,prompts:value.prompts,sources};
}

const stop = new Set("the a an in on for of is are and or it to can how what about that this tell me more does do did your you".split(" "));
function words(text: string) {
  return new Set((text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || []).filter(word => word.length>1 && !stop.has(word)));
}

export function findAssistantEvidence(config: AssistantConfig, question: string, previous = "") {
  const query = words(question), context = words(previous);
  const passages = config.sources.flatMap(source =>
    source.text.split(/\n\s*\n/).flatMap(paragraph => paragraph.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [paragraph])
      .map(text => ({source,text:text.trim(),terms:words(text),titleTerms:words(source.title)}))
      .filter(item => item.text.length > 0));
  const includeContext = query.size < 4 || /\b(it|that|this|they|them|those|more)\b/i.test(question);
  return passages.map(passage => {
    let score = 0, direct = false;
    for (const word of query) {
      if (passage.terms.has(word)) { score += 4; direct = true; }
      else if (passage.titleTerms.has(word)) { score += 2; direct = true; }
    }
    if (includeContext && (direct || query.size === 0)) {
      for (const word of context) if (passage.terms.has(word) || passage.titleTerms.has(word)) score += 1;
    }
    return {...passage,score};
  }).filter(item => item.score > 0).sort((a,b) => b.score-a.score).slice(0,3)
    .map(({source,text}) => ({title:source.title,url:source.url,text}));
}
