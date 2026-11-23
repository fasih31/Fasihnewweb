import { useState } from "react";

type Role = "Customer" | "Sales" | "Operations";
type Stage = "accepted" | "requested" | "held" | "ready";
const messages: Record<Role, Record<Stage, string>> = {
  Customer: {
    accepted: "Your quote is accepted. Delivery details are still needed.",
    requested: "Add a delivery address so we can schedule your order.",
    held: "Your order is on hold while delivery details are checked.",
    ready: "Your delivery details are confirmed. Your order can now be scheduled.",
  },
  Sales: {
    accepted: "The customer accepted quote version 2. Delivery details are incomplete.",
    requested: "Operations has asked the customer to confirm the delivery address.",
    held: "Fulfilment is on hold. The accepted quote is still on record.",
    ready: "The accepted quote and delivery details are ready for fulfilment.",
  },
  Operations: {
    accepted: "Quote accepted. Delivery address missing.",
    requested: "Address requested. Waiting for the customer.",
    held: "Order on hold. Request the missing address to continue.",
    ready: "Address confirmed. The order is ready for fulfilment.",
  },
};
export function OrderDemo() {
  const [role, setRole] = useState<Role>("Operations");
  const [stage, setStage] = useState<Stage>("accepted");
  return <section className="order-demo" aria-label="Illustrative device order">
    <h2>Inside a device order</h2>
    <img src="/work/device-order.webp" alt="" width="866" height="297" fetchPriority="high" />
    <div className="role-picker" role="group" aria-label="Explore a perspective">
      {(["Customer","Sales","Operations"] as const).map(item =>
        <button key={item} aria-pressed={role === item} onClick={() => setRole(item)}>{item}</button>)}
    </div>
    <p aria-live="polite">{messages[role][stage]}</p>
    <div className="demo-actions">
      {role === "Operations" && (stage === "accepted" || stage === "held") &&
        <button onClick={() => { setStage("requested"); setRole("Customer"); }}>Request details ↗</button>}
      {role === "Operations" && stage === "accepted" && <button onClick={() => setStage("held")}>Hold order</button>}
      {role === "Customer" && stage !== "ready" && <button onClick={() => setStage("ready")}>Confirm example address</button>}
      {role === "Sales" && <button onClick={() => setRole("Operations")}>View operations</button>}
      {stage !== "accepted" && <button onClick={() => { setStage("accepted"); setRole("Operations"); }}>Restart demo</button>}
    </div>
  </section>;
}
