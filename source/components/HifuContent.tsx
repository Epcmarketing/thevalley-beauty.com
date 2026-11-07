import type { ReactNode } from "react";
// Fixed revision date in Asia/Kuala_Lumpur, independent of build time.
export const HIFU_UPDATED = "2026-11-07";
export const hifuOverview = "HIFU stands for high-intensity focused ultrasound. HIFU skin tightening is a non-surgical treatment intended to improve mild to moderate facial skin laxity through a gradual collagen response. You can discuss whether it suits your concerns at The Valley Beauty in Desa Sri Hartamas, Kuala Lumpur.";
const asds = "https://www.asds.net/skin-experts/skin-treatments/ultrasound-therapy-for-sagging-skin";
const aad = "https://www.aad.org/public/cosmetic/younger-looking/firm-sagging-skin";
export const hifuFaq = [
{q:"How does HIFU skin tightening compare with a surgical facelift?",a:"HIFU offers more modest, gradual tightening than a surgical facelift. It does not remove excess skin or surgically reposition tissue; marked sagging may need surgical assessment. Discuss likely benefit, risks and recovery before choosing.",source:aad,sourceLabel:"AAD"},
{q:"When might I notice a change, and how can I assess the result?",a:"Changes may develop over two to six months, but timing and improvement vary. Agree on a review date and compare baseline and follow-up photographs with the same lighting, angle, distance and expression. Early swelling is not the final result, and improvement is not guaranteed.",source:asds,sourceLabel:"ASDS"},
{q:"What downtime should I plan for after HIFU?",a:"Many people return to usual activities soon after treatment, but allow for temporary redness, swelling or discomfort. Bruising or numbness can occur, and tenderness or tingling may last longer than visible redness. Ask for individual advice and avoid booking immediately before an important event.",source:asds,sourceLabel:"ASDS"},
{q:"Which symptoms after treatment should prompt me to contact my clinician?",a:"Contact your clinician promptly for severe or worsening pain, blisters or burns, new facial weakness or asymmetry, or persistent or worsening numbness. These need assessment rather than waiting for a routine review; also report symptoms that do not settle as your aftercare instructions describe. Seek urgent medical care for sudden vision changes or difficulty breathing or swallowing.",source:"https://pmc.ncbi.nlm.nih.gov/articles/PMC13376685/",sourceLabel:"focused-ultrasound complication"}
];
function Section({title,children}:{title:string;children:ReactNode}) {return <section className="mt-14 border-t border-sand pt-10"><h2 className="font-display text-3xl text-ink">{title}</h2>{children}</section>}
function Sub({title,children}:{title:string;children:ReactNode}) {return <div className="mt-7"><h3 className="font-display text-xl text-ink">{title}</h3><p className="mt-3 text-lg leading-relaxed text-ink-soft">{children}</p></div>}
function Source({href,children}:{href:string;children:ReactNode}) {return <p className="mt-4 text-sm leading-relaxed text-taupe">Further reading: <a href={href} className="text-gold-deep underline underline-offset-4">{children}</a>.</p>}
export function HifuBody(){return <>
<p className="mb-8 text-sm text-taupe">Last updated: <time dateTime={HIFU_UPDATED}>7 November 2026</time></p>
<Section title="What Is HIFU Skin Tightening?">
<p className="mt-5 text-lg leading-relaxed text-ink-soft">Focused ultrasound delivers heat to selected tissue beneath the skin to encourage new collagen formation. In facial aesthetic treatment, microfocused ultrasound is one form of HIFU used for this purpose; the device, depth and technique matter. It requires no surgical incisions, but can cause discomfort and unwanted tissue injury.</p>
<Source href="https://www.aium.org/resources/official-statements/view/statement-on-the-safety-of-cosmetic-ultrasound">AIUM: cosmetic focused ultrasound and safety</Source></Section>
<Section title="Who May Benefit From HIFU?">
<p className="mt-5 text-lg leading-relaxed text-ink-soft">People with early to moderate looseness around the lower face, under the chin or neck may consider an assessment if they want a subtle change and accept a gradual response. A consultation is needed to establish whether skin laxity is causing the concern.</p>
<Sub title="What Will the Clinician Assess?">The assessment should cover skin laxity and thickness, facial volume and your expectations. Share your medical history, medicines, implants and previous procedures, including fillers, threads or surgery, so the clinician can check precautions and explain an appropriate plan.</Sub>
<Sub title="When Might Another Option Be More Suitable?">Marked excess skin, substantial volume loss or a desire for a dramatic lift may call for another approach, including surgical assessment. Active infection, open wounds or medical concerns may mean postponing or avoiding treatment; suitability depends on the proposed device and clinical assessment.</Sub>
<Source href={aad}>AAD: choosing an approach to sagging skin</Source></Section>
<Section title="What to Expect Before, During and After HIFU">
<Sub title="Before Your Appointment">Bring your treatment history and medicines list, and explain the change you hope to see. Ask about the device, operator, possible complications, expected benefit and follow-up; obtain individual preparation instructions and do not stop prescribed medicines without advice.</Sub>
<Sub title="During Treatment">The skin is cleansed, ultrasound gel is applied and a handpiece delivers energy to planned areas. You may feel heat, tingling or discomfort; tell the operator if it becomes painful. Session length and comfort measures depend on your treatment plan.</Sub>
<Sub title="After Treatment">Follow the written aftercare instructions and keep the clinic’s contact details available. Temporary redness, swelling or tenderness can occur, and tingling, bruising or numbness may develop. Attend the agreed review to assess progress and any concerns.</Sub>
<Source href={asds}>ASDS: focused-ultrasound treatment, preparation and recovery</Source>
<p className="mt-3 text-sm leading-relaxed text-taupe">These references describe cosmetic ultrasound generally or particular systems; they do not confirm which device this clinic uses or predict your outcome.</p></Section>
</>}
