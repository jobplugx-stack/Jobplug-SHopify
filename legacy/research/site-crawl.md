# JobPlug live site crawl (https://www.jobplug.co)

Crawled 2026-10-12 (fetched with curl/HTTP; HTML and /products.json parsed). Nothing was submitted or purchased. Compared against the prior extraction in `Jobplug-SHopify/extraction/`.

## 0. Headline findings

1. **No content changes vs. the prior extraction.** Every page, product description, price, variant, collection and blog post is textually identical to the prior capture. Only `products.json` `updated_at` stamps are new (all 12 products = 2026-10-12T13:50:52-05:00, i.e. a bulk touch/resave, no field changes).
2. **NEW vs. prior extraction (not previously captured):** `/policies/privacy-policy` (Last updated August 28, 2026, full text in Appendix A), `/agents.md` text analysis, `/sitemap_articles_1.xml` and `/sitemap_metaobject_pages_1.xml` (both listed in the sitemap index; the first two entries are the same as before), and the facts that **no refund, terms-of-service, shipping or contact-information policy exists (all 404)**.
3. The biggest customer-facing problem is the interview packages vs. services overlap and several pricing/naming inconsistencies (Section 4 and 6).

## 1. Page inventory (all return HTTP 200 unless stated)

Sitemap index (`/sitemap.xml`) lists: agentic_discovery, products, pages, collections, blogs, articles, metaobject_pages.

| URL | Title / purpose |
|---|---|
| / | Home ("JobPlug"). Meta description: "JobPlug is a done for you career placement service. We find the jobs, send the applications, and get you interviews. You just show up ready. Get placed in 30 days." |
| /pages/free-consultant | "Free Consultant" (nav label: "Consultations"). Calendly inline widget: calendly.com/customtechconsultants/30min. No visible text in static HTML; no meta description. |
| /collections/packages | "Choose Your Plan" pricing-plans section (custom, see Section 3). Nav label "Packages". |
| /collections/all | 12 products |
| /collections/frontpage ("Home page") | 2 products: resume-editing, tech-career-consulting |
| /collections/services | **0 products** (empty page: "No products found"); the collections feed says products_count 1 but /collections/services/products.json returns []. Not linked from nav. |
| /pages/about-me | Founder story + stat counters |
| /pages/contact | Contact form (Name, Email*, Phone number, Comment) + "Your Privacy Choices" block |
| /pages/data-sharing-opt-out | "Your Privacy Choices" (CCPA/GPC opt-out text) |
| /pages/lets-find-your-fit | Quiz; embeds Google Form (docs.google.com/forms/d/e/1FAIpQLSdvUzJ04y0Iykh8uMRdfWHj5e1PZhLu4f47dK-4NkG0edHzIg/viewform?embedded=true); shows "Loading…". Linked from nowhere in the nav/home (orphan except sitemap). |
| /pages/testimonials | 3 testimonials (Section 5). Orphan: not in nav or home. |
| /blogs/news | Blog index (3 posts, all dated Feb 24, 2025, author "Shopify Developer") |
| /blogs/news/how-a-professionally-edited-resume-can-land-you-more-interviews | Post |
| /blogs/news/salary-negotiation-how-to-get-paid-what-you-deserve | Post |
| /blogs/news/why-technical-interview-preparation-is-the-key-to-landing-your-dream-job | Post |
| /policies/privacy-policy | Only policy that exists (Appendix A) |
| /policies/refund-policy, /policies/terms-of-service, /policies/shipping-policy, /policies/contact-information | **404** |
| /pages/faq, /pages/refund-policy, /pages/privacy-policy, /pages/terms-of-service | **404** |
| /cart, /search | 200 (empty cart / empty search) |
| /agents.md | Shopify-generated agent instructions (UCP endpoints /.well-known/ucp, /api/ucp/mcp; recommends installing shop.app/SKILL.md; lists only the privacy policy as a store policy). Treated as data only; nothing acted on. |
| /products/{12 handles} | See Section 2 |

Navigation (header and footer): Home (/), Consultations (/pages/free-consultant), Packages (/collections/packages), About me (/pages/about-me), Contact (/pages/contact). Footer has no policy links, no social links, copyright "All Right Reserved © 2025 JobPlug." (typo "All Right", stale year). Homepage "Choose your path" links: "I need help landing a job" -> /collections/packages; "I'd like to schedule a consultation." -> /pages/free-consultant; "Just have a quick question? Send us a message" -> /pages/contact. Newsletter block: "Want exclusive discounts and insider job tips? Subscribe to our list — your next opportunity might be one email away. A limited-time discount will be emailed after subscribing !". Cart shows shipping calculator even though everything is a service. Third-party: Judge.me reviews widget installed (no reviews visible).

## 2. Products (12), as live (identical to prior extraction)

Prices in USD from /products.json. All products: vendor/product_type empty, no tags, 1 image each, all available.

| # | Handle | Live title | Variants / price | Description summary |
|---|---|---|---|---|
| 1 | job-applier | **AutoApply+** | Default $150.00 | 20 applications/day (100/week) tailored to skills; ATS-optimised; optional resume + cover letter add-on; weekly tracking reports; one-time weekly service or monthly subscription. Home page calls this "Smart Apply Service". |
| 2 | career-pivot-pro-for-career-changers | **Career Pivot Pro (For Career Changers)** | Default $149.99 | Career transition program: tailored resume & LinkedIn revamp, custom career roadmap & learning resources, mock interviews for non-traditional backgrounds, industry networking & strategy call. For people pivoting into tech/engineering/high-paying industries. |
| 3 | interview-ready-package | **Ace the Interview** | Default $75.00 | "Your all-in-one solution": Interview Guide & Timeline, Study Guide, Technical Interview Coaching (mock sessions), Personalized Interview Cheat Sheet. For professionals with upcoming technical/high-impact interviews. Home card is labelled "Interview-Ready Package". |
| 4 | 30-day-tech-interview-vip-package-land-your-dream-job | **The Job Lock-In Package** | "Pay in Full" $300.00 (compare-at $400.00); "Deposit" $100.00 (compare-at $400.00) | Done-for-you placement: Smart Apply Service (daily applications), Industry-Tailored Mock Interview, Weekly Job Alerts + VIP Event Access. 30-day interview guarantee (free career strategy session if no interview in 30 days). Pay in full $300 (save $100) or $99 deposit with $300 balance due "before you land your job". Handle still says "30-day-tech-interview-vip-package-land-your-dream-job". |
| 5 | salary-negotiation-assistance | **Salary Negotiation Assistance** | Default $50.00 | 6 items: compensation benchmarking report, offer review & scripts, 1:1 negotiation coaching, total comp maximisation, promotion/raise positioning, personalised salary roadmap. |
| 6 | tech-principles-study-session | **Tech Principles Study Session** | Default $10.00 | Technical deep-dives, real-world relevance, showcasing skills, 1:1 or group, live support. |
| 7 | customized-interview-cheat-sheet | **Customized Interview Cheat Sheet Your Personalized Path to Success** | Default $10.00 | Role-specific questions, expert answers, personalised study plan, STAR/storytelling strategies, bonus templates (follow-up emails, must-ask questions). (Title missing a separator before "Your Personalized Path to Success"; the tagline is repeated as the first line of the description.) |
| 8 | interview-guide-breakdown | **Interview Guide & Breakdown** | Default $10.00 | Role-specific interview roadmap, stage-by-stage prep, key questions & sample answers, tips from hiring experts, bonus printable checklist. |
| 9 | mock-technical-interview | **The Plug- In Plan** | Default $100.00 | Deposit version of the Job Lock-In Package: $99 deposit (listed as $100.00), "Total investment ... $399", $300 balance due before you land your job, "non-negotiable". Includes Smart Apply, Mock Interview, Weekly Job Alerts + VIP events, Profile Setup & Onboarding, Constant Communication, 30-day guarantee. Handle still "mock-technical-interview" (original product). |
| 10 | technical-interview-preparation-1 | **Technical Interview Preparation** | Default $20.00 | Personalised interview guide, mock technical interviews, company/team research, optimised study plan, behavioural + technical integration (STAR/SOAR). Handle has stray "-1" suffix. |
| 11 | tech-career-consulting | **Technical Consulting: Elevate Your Career with Expert Guidance** | Default $10.00 | 1:1 coaching: job-search strategy refinement, resume & LinkedIn optimisation, industry-specific technical guidance. Description contains typo "ndustry-specific". |
| 12 | resume-editing | **Technical Resume Editing** | Default $25.00 | ATS-compliant resume refinement, up to three versions, keyword/format optimisation, detailed change breakdown. |

Numbers not on products: none of the prior values changed (titles, prices, variants, body_html all identical).

## 3. How products are grouped today, and where it is confusing

**Collections as configured in Shopify**
- Home page (`frontpage`): Technical Resume Editing, Technical Consulting.
- Packages: The Job Lock-In Package, Career Pivot Pro. (The `/collections/packages` *page* is rendered by a custom "pricing plans" section instead, showing two cards: Job Lock-In Package and The Plug- In Plan, with hard-coded copy. Career Pivot Pro does not appear on that page even though it is in the collection.)
- Services: empty (0 products shown) and not linked from nav.
- All: all 12.
- Ungrouped (only in All): AutoApply+, Ace the Interview, Salary Negotiation Assistance, Tech Principles Study Session, Customized Interview Cheat Sheet, Interview Guide & Breakdown, Technical Interview Preparation, The Plug- In Plan.

**Homepage "What We Offer" cards** (three hero cards): "30-Day Tech Interview", "Interview-Ready Package", "Career Pivot". Then a services row: Mock Technical Interview, Tech Principles Study Session, Technical Interview Preparation, Smart Apply Service, Technical Consulting.

**Packages page content** ("Choose Your Plan"): 
- The Job Lock-In Package: badge "On sale", "Best value, save $100 when you pay today", $400 struck to $300, "30 days", "Payment options are avalible" [sic], "Guaranteed interview within 30 days — or get a free career strategy session." Includes: Smart Apply Service, Resume & LinkedIn Optimization, Industry-Tailored Mock Interview, 48-Hour Job Alerts & VIP Event Access.
- The Plug- In Plan: badge "Most Popular", "Lock in your spot today with a deposit", $400 struck to $100, "30 days", full deposit copy.

**Confusing overlaps (the core problem for the owner)**
1. **Job Lock-In Package and The Plug- In Plan are the same offer at two payment terms**, shown as two separate products. Plug-In Plan = Job Lock-In on deposit. Yet Job Lock-In ALSO has its own "Deposit" variant ($100). So the deposit can be bought in two places. Recommend one product with a payment-plan option.
2. **Interview packages vs. individual services overlap heavily.** "Ace the Interview" ($75) = Interview Guide + Study Guide + Technical Interview Coaching (mock) + Cheat Sheet, which are also sold separately as: Interview Guide & Breakdown ($10), Customized Interview Cheat Sheet ($10), Technical Interview Preparation ($20; guide + mock + research + study plan + STAR), Tech Principles Study Session ($10). Technical Interview Preparation also overlaps with Ace the Interview almost line-for-line. Nowhere does the site say what's cheaper or what's different.
3. **Two different "interview" product families:** coaching/prep (Ace the Interview, Interview Guide, Cheat Sheet, Tech Prep, Study Session) vs. done-for-you placement with a guarantee (Job Lock-In / Plug-In Plan / AutoApply+). They are mixed in /collections/all with no category.
4. **AutoApply+ ($150) vs. Smart Apply** inside the Job Lock-In package: same underlying service sold standalone and bundled; home calls it "Smart Apply Service" but title is "AutoApply+".
5. **Resume work appears in 4 places:** Technical Resume Editing ($25), Career Pivot Pro (resume & LinkedIn revamp), Technical Consulting (resume & LinkedIn optimisation), Job Lock-In (listed on Packages page as "Resume & LinkedIn Optimization" but NOT in the product page's "What is included" list).
6. **Technical Consulting ($10)** is vague and overlaps with all of the above; it is on the home collection together with Resume Editing.
7. **Homepage card labels link to the wrong products:** the first hero card "30-Day Tech Interview" links to `/products/technical-interview-preparation-1` ($20 prep service), NOT the 30-day package. The homepage "Technical Interview Preparation" card links to the same URL (duplicate). "Mock Technical Interview" card links to /products/mock-technical-interview, which is now "The Plug- In Plan" ($100 deposit plan for placement, not a mock interview). "Career Pivot" and "Interview-Ready Package" cards link correctly. The Hiring Process on the home page says "Pick Your Package ... Our 30-Day Guaranteed Package is our most popular" but there is no one-click route to it from the hero.
8. **Naming drift:** URL handles still reflect old names (`mock-technical-interview` = Plug-In Plan; `30-day-tech-interview-vip-package...` = Job Lock-In; `interview-ready-package` = Ace the Interview; `job-applier` = AutoApply+).
9. **Nav label vs. page:** "Consultations" -> /pages/free-consultant (a "Free Consultant" Calendly booking), while a *paid* $10 "Technical Consulting" product also exists. Unclear which is free vs paid.
10. **Sale display:** /collections/all shows Job Lock-In as "$100.00, was $400.00, 75% OFF" because the cheapest variant (Deposit, $100) is shown vs. $400 compare-at. That 75% badge is misleading (the real full price is $300, a 25% discount) and would appear in search/ads.

### Suggested clean structure (for the owner to decide)
- **Tier 1 "Done-for-you placement" (one product): The Job Lock-In Package**, $300 pay-in-full / $399 total via deposit option ($99 now + $300 later), with 30-day guarantee. Retire the separate Plug-In Plan product or make it a payment-plan variant only. Fix deposit price ($99 vs $100) and the compare-at.
- **Tier 2 "Interview prep packages":** Ace the Interview ($75) (and optionally Career Pivot Pro $149.99 as the career-changer package). State explicitly "includes the guide, cheat sheet, study guide and mock coaching; buying these separately would cost $X".
- **Tier 3 "A la carte services":** Resume Editing, Salary Negotiation, Technical Interview Prep, Tech Principles Study Session, Interview Guide, Cheat Sheet, AutoApply+, Technical Consulting. Put these in the (currently empty) Services collection so the nav "Consultations/Services" and "Packages" separation is real.
- Make home cards, collection page and product handles consistent with the names.

## 4. Pricing and consistency problems

| Issue | Evidence |
|---|---|
| Deposit amount mismatch | Job Lock-In "Deposit" variant is $100.00; copy says "$99 deposit". Plug-In Plan priced $100.00; copy says "$99 deposit" and "Total investment ... $399". |
| Total mismatch | Packages page struck price "$400" for both; pay-in-full $300 + deposit route = $99 + $300 = $399, so deposit route costs MORE than the "save $100" pay-in-full price ($300), yet the Packages page labels it "$400 -> $100". Job Lock-In page says "pay in full ... save $100" (vs $400) but deposit total is $399. |
| Compare-at on Deposit variant | Deposit variant carries compare-at $400 so the product page shows "$100, was $400" (75% off) |
| Balance mechanism | "$300 due before you land your job", "non-negotiable", but no mechanism on the site to collect the remaining balance (no second product/invoice) and no refund/terms policy governing it. |
| Resume & LinkedIn Optimization | Listed on Packages page card, absent from the Job Lock-In product page included list (product page lists Smart Apply, Mock Interview, Weekly Job Alerts/VIP only). |
| Job alerts cadence | Packages page says "48-Hour Job Alerts & VIP Event Access"; product pages say "Weekly Job Alerts and VIP Event Access". |
| Guarantee wording | Product page: "If we do not get you an interview within 30 days, you receive a free career strategy session on us." Plug-In page: "30 day interview guarantee. Same guarantee, same commitment, no matter how you pay." Packages page: "Guaranteed interview within 30 days — or get a free career strategy session." Home: "Get placed in 30 days." (meta description) which overstates the guarantee (guarantee is an interview, not placement). No guarantee terms/conditions published. |
| Packages page typo | "Payment options are avalible" (twice) |
| Collections | Services collection: feed says 1 product, page shows 0 |
| Stale footer | "All Right Reserved © 2025 JobPlug." |
| Blog | 3 posts all Feb 2025, author "Shopify Developer" (default placeholder) |
| Placeholder content | /pages/contact, /pages/about-me, /pages/lets-find-your-fit, /pages/testimonials and data-sharing-opt-out all render a leftover theme section: "Explore Our Collections" with "Reliable Music / Soft Rhythm / Music Therapy / Fuse Music" Latin filler, and an "Our team" block: Ala Olivia (CEO), George Leo (Project Manager), Amelia Jacky (Production Controller), Daniel Arthur (Store Manager). Appears to be dummy theme content visible in the live HTML (on the pages that include that section; it appears in the page text of those pages). |
| Orphan pages | /pages/testimonials and /pages/lets-find-your-fit are not linked from nav/footer/home. |
| Nav label | "Consultations" vs page title "Free Consultant" |
| Home page stats | Counters render raw numbers with a "K" element separate from labels (see Section 5), ambiguous. |
| Scheduler account | Calendly username is "customtechconsultants" (old brand) |
| Privacy contact | jobplugx@gmail.com; address 19931 Faye Oaks Drive, Humble TX 77346 |
| Missing policies | No refund, terms, shipping (digital services), or contact-information policy; footer lacks any policy links; privacy policy is not linked in footer either. |

No hard broken internal links were found among nav/home/packages links (all 200). Soft-broken: homepage card -> wrong product (Section 3 #7), empty Services collection, and the four missing /policies/* URLs (404).

## 5. Testimonials, stats and claims (exact wording)

### /pages/testimonials (heading "Testimonial")
1. "Working with this team was a game-changer. I’m Tolu, and after months of struggling to break into the tech industry, their guidance completely shifted my momentum. From refining my resume and LinkedIn to targeted mock interviews and a personalized strategy, I started seeing real results fast. Within a few weeks, I landed multiple tech interviews with top companies. The support felt truly tailored, and I finally felt confident telling my story in a way that clicked with recruiters. Highly recommend!" — attribution line text reads "Tolu" / "Zeke"
2. "I’m Wale, and I can confidently say this service made all the difference in my tech job search. From day one, the support was focused, professional, and genuinely personalized. My resume and LinkedIn were completely transformed, and the mock interviews helped me sharpen how I presented myself. Within just a few weeks, I had multiple interviews lined up with top tech companies. I finally felt like I had a strategy—and it worked. If you’re serious about breaking into tech, this is the team to work with." — attribution "Terry"
3. "Wale came to us looking for a breakthrough in the competitive tech industry—and he found it. After receiving a tailored resume overhaul, LinkedIn optimization, and focused interview coaching, he quickly started landing multiple interviews with top-tier tech companies. The strategic approach gave him the confidence and clarity he needed to stand out. His success is a testament to the power of preparation, personalization, and the right support system." — attribution "Thomas"

Inconsistencies: names/attributions don't line up (quote 1 signed Tolu but attribution line "Zeke"; quote 2 is Wale's own words but attributed to "Terry"; quote 3 is a third-person write-up about Wale by "Thomas", i.e. two testimonials about the same client, one apparently not by a customer). No last names, photos, dates, roles or outcomes (company names). Judge.me review widget present but no reviews.

### Home page
- Meta: "JobPlug is a done for you career placement service. We find the jobs, send the applications, and get you interviews. You just show up ready. Get placed in 30 days."
- "Companies we've helped candidates interview with and land jobs at" (logo marquee, "Hiring Partners", "Technologies").
- Counters (data-value / label): 13 "Hiring Partners"; 25 "Technologies"; 1 "Successful Placements" and 2 "Job Applications Processed" each followed by a "K" suffix element (so rendered as 1K and 2K).
- Hiring Process steps: "Pick Your Package: Choose a plan that fits your needs. Our 30-Day Guaranteed Package is our most popular and proven option." / "Create Your Profile: You'll receive an email with a secure link to fill out your details and upload your resume." / "Research & Market Alignment: We analyze your experience and identify what's trending in the current job market." / "Opportunity Matching: We hand-select roles that align with your background and career growth." / "Resume + Branding: We rebuild your resume and profile to showcase the best version of you." / "Targeted Applications: We apply to strategic roles on your behalf until you land your first interview."
- Service card taglines: "Real-world simulations with expert feedback." / "One-on-one or group coaching on key technical concepts" / "Coaching on coding & system design." / "We apply for jobs on your behalf & track progress." / "One-on-one coaching to refine job search strategy."

### /pages/about-me (counters: value / label)
8 "Years of Experience"; 45 "technical skills"; 500 "interviews completed"; 1 + "K" "Technical resumes created" (i.e. 1K).
Story text (verbatim): "I started this journey in college by helping friends who were searching for internships and had no idea where to begin. I shared the same strategies that helped me land interviews and offers quickly, and the results spread far beyond what I expected. Friends told their families, classmates, and coworkers, and before long I had helped more than thirty people secure opportunities they once believed were out of reach. Over time I began asking people what they truly wanted for their lives and careers, and that simple question opened doors for real transformation. People started discovering their confidence again, stepping into roles that matched their potential, and seeing possibilities they did not see before." / "That growth is what inspired the creation of JobPlug. I realized people are not lacking talent, they are lacking direction, clarity, and someone who genuinely believes in them. Today JobPlug is a proven system that helps anyone land meaningful roles across every industry, from skilled trades to engineering, leadership, customer support, and creative fields. My mission is to help people believe in what they bring to the table and turn their goals into reality. With the right support and the right plug guiding you, your career and your life can change in ways you never imagined. That is the heart of JobPlug." CTA: "Schedule a Consultation".
Claim consistency: about page says 500 interviews completed / 1K resumes; home says 1K successful placements and 2K applications processed; positioning shifts between "technical/tech" (product names, testimonials, "technical skills") and "every industry" (about page, footer). Stats are unsourced.

### Other claims
- Footer: "JobPlug helps people in every industry land the roles they deserve with confidence. We offer personalized career coaching, resume upgrades that highlight your strengths, and interview coaching that helps you stand out in any field. ..."
- Guarantee wording: see Section 4.
- Quiz page: "Answer a few quick questions and find out exactly what career options are waiting for you. Takes less than 2 minutes. Our team gets to work the moment you submit."
- Blog claims: "A higher starting salary means greater long-term earnings." / "A resume editor refines your document, ensuring it aligns with industry standards and showcases your value. This small investment can lead to faster job placement and higher salary offers." / "A structured approach to technical interview preparation can increase your confidence, improve your problem-solving skills, and help you stand out from the competition."

## 6. Legal / policy text

- **Refund policy: none** (/policies/refund-policy = 404). No refund, cancellation, or dispute language anywhere on the site (including product pages, which only contain the guarantee and non-negotiable-balance wording quoted above).
- **Terms of service: none** (404). **Shipping policy: none** (404). **Contact information policy: none** (404).
- Product-page payment language (verbatim, Plug-In Plan): "Important Payment Information: Total investment for this option is $399. The $99 deposit is due today to secure your spot. Your remaining balance of $300 is required before you land your job within the 30 day window. This balance is non-negotiable and must be settled as interviews are secured on your behalf. Please do not select the deposit option if you are not prepared to fulfill the remaining balance. We invest real time and resources into every client from day one."
- Job Lock-In: "Backed by a 30-day interview guarantee. If we do not get you an interview within 30 days, you receive a free career strategy session on us. No excuses, just results." / "Put down a $99 deposit to lock in your spot today. The remaining balance of $300 is due before you land your job."
- Privacy-choices block (contact and data-sharing-opt-out pages), verbatim: "As described in our Privacy Policy, we collect personal information from your interactions with us and our website, including through cookies and similar technologies. We may also share this personal information with third parties, including advertising partners. We do this in order to show you ads on other websites that are more relevant to your interests and for other reasons outlined in our privacy policy." / "Sharing of personal information for targeted advertising based on your interaction on different websites may be considered "sales", "sharing", or "targeted advertising" under certain U.S. state privacy laws. Depending on where you live, you may have the right to opt out of these activities. If you would like to exercise this opt-out right, please follow the instructions below." / "If you visit our website with the Global Privacy Control opt-out preference signal enabled, depending on where you are, we will treat this as a request to opt-out of activity that may be considered a "sale" or "sharing" of personal information or other uses that may be considered targeted advertising for the device and browser you used to visit our website."
- Privacy policy: full verbatim text in Appendix A (Last updated August 28, 2026; contact jobplugx@gmail.com, 19931 Faye Oaks Drive, Humble TX 77346). The policy is the standard Shopify template; it refers to "make a purchase" but there are no purchase terms.
- Recommendation: add refund/cancellation, terms of service (incl. the guarantee conditions, deposit/balance obligation, what counts as an "interview"), and link all policies in the footer (Shopify Settings > Policies auto-generates /policies/* pages).

## 7. Changes vs. prior extraction

| Item | Prior | Live now |
|---|---|---|
| Page text (home, collections, about, contact, testimonials, quiz, opt-out, blog index + 3 posts, 12 product pages) | captured | **identical** |
| products.json titles, descriptions, prices, variants, compare-at | captured | **identical** |
| products.json updated_at | earlier | all 12 = 2026-10-12T13:50:52-05:00 (bulk resave; no field diffs) |
| Collections | frontpage 2, packages 2, services (0 shown) | same; updated_at: packages 2026-08-30, services 2026-05-23, frontpage 2026-04-13 |
| Privacy policy page | not captured | **NEW**: Last updated August 28, 2026 (Appendix A) |
| Refund/terms/shipping policies | not captured | confirmed **404 / do not exist** |
| Sitemap index | products, pages, collections, blogs, agentic_discovery | adds `sitemap_articles_1.xml` and `sitemap_metaobject_pages_1.xml` to the index; URL set otherwise same (12 products, 6 pages [about-me, contact, data-sharing-opt-out, free-consultant, lets-find-your-fit, testimonials], 3 collections, blog + 3 articles, agents.md, home) |
| /agents.md | captured | same purpose; lists only the privacy policy |

## Appendix A: Privacy policy, verbatim (https://www.jobplug.co/policies/privacy-policy)

> Privacy policy
> Last updated: August 28, 2026
> This Privacy Policy describes how JobPlug (the "Site", "we", "us", or "our") collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from www.jobplug.co (the "Site") or otherwise communicate with us regarding the Site (collectively, the "Services"). For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services, whether you are a customer, website visitor, or another individual whose information we have collected pursuant to this Privacy Policy.
> Please read this Privacy Policy carefully. By using and accessing any of the Services, you agree to the collection, use, and disclosure of your information as described in this Privacy Policy. If you do not agree to this Privacy Policy, please do not use or access any of the Services.
> Changes to This Privacy Policy
> We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.
> How We Collect and Use Your Personal Information
> To provide the Services, we collect and have collected over the past 12 months personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us.
> In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide or improve or improve the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
> What Personal Information We Collect
> The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.
> Information We Collect Directly from You
> Information that you directly submit to us through our Services may include:
> Contact details including your name, address, phone number, and email.
> Order information including your name, billing address, shipping address, payment confirmation, email address, and phone number.
> Account information including your username, password, security questions and other information used for account security purposes.
> Customer support information including the information you choose to include in communications with us, for example, when sending a message through the Services.
> Some features of the Services may require you to directly provide us with certain information about yourself. You may elect not to provide this information, but doing so may prevent you from using or accessing these features.
> Information We Collect about Your Usage
> We may also automatically collect certain information about your interaction with the Services (" Usage Data "). To do this, we may use cookies, pixels and similar technologies (" Cookies "). Usage Data may include information about how you access and use our Site and your account, including device information, browser information, information about your network connection, your IP address and other information regarding your interaction with the Services.
> Information We Obtain from Third Parties
> Finally, we may obtain information about you from third parties, including from vendors and service providers who may collect information on our behalf, such as:
> Companies who support our Site and Services, such as Shopify.
> Our payment processors, who collect payment information (e.g., bank account, credit or debit card information, billing address) to process your payment in order to fulfill your orders and provide you with products or services you have requested, in order to perform our contract with you.
> When you visit our Site, open or click on emails we send you, or interact with our Services or advertisements, we, or third parties we work with, may automatically collect certain information using online tracking technologies such as pixels, web beacons, software developer kits, third-party libraries, and cookies.
> Any information we obtain from third parties will be treated in accordance with this Privacy Policy. Also see the section below, Third Party Websites and Links.
> How We Use Your Personal Information
> Providing Products and Services. We use your personal information to provide you with the Services in order to perform our contract with you, including to process your payments, fulfill your orders, to send notifications to you related to your account, purchases, returns, exchanges or other transactions, to create, maintain and otherwise manage your account, to arrange for shipping, facilitate any returns and exchanges and other features and functionalities related to your account. We may also enhance your shopping experience by enabling Shopify to match your account with other Shopify services that you may choose to use. In this case, Shopify will process your information as set forth in its Privacy Policy and Consumer Privacy Policy.
> Marketing and Advertising. We may use your personal information for marketing and promotional purposes, such as to send marketing, advertising and promotional communications by email, text message or postal mail, and to show you advertisements for products or services. This may include using your personal information to better tailor the Services and advertising on our Site and other websites.
> Security and Fraud Prevention. We use your personal information to detect, investigate or take action regarding possible fraudulent, illegal or malicious activity. If you choose to use the Services and register an account, you are responsible for keeping your account credentials safe. We highly recommend that you do not share your username, password, or other access details with anyone else. If you believe your account has been compromised, please contact us immediately..
> Communicating with You and Service Improvement. We use your personal information to provide you with customer support and improve our Services. This is in our legitimate interests in order to be responsive to you, to provide effective services to you, and to maintain our business relationship with you
> Cookies
> Like many websites, we use Cookies on our Site. For specific information about the Cookies that we use related to powering our store with Shopify, see https://www.shopify.com/legal/cookies . We use Cookies to power and improve our Site and our Services (including to remember your actions and preferences), to run analytics and better understand user interaction with the Services (in our legitimate interests to administer, improve and optimize the Services). We may also permit third parties and services providers to use Cookies on our Site to better tailor the services, products and advertising on our Site and other websites.
> Most browsers automatically accept Cookies by default, but you can choose to set your browser to remove or reject Cookies through your browser controls. Please keep in mind that removing or blocking Cookies can negatively impact your user experience and may cause some of the Services, including certain features and general functionality, to work incorrectly or no longer be available. Additionally, blocking Cookies may not completely prevent how we share information with third parties such as our advertising partners.
> Our website also recognizes the Global Privacy Control (GPC) signal, which enables you to opt-out of certain uses or disclosures of your information. If you notify us of your preference through GPC, we will treat such signal as a valid request to opt out of sharing / targeted advertising for the associated browser or device, and, if we are able to associate the device sending the signal to a Shopify account, we will apply the opt out request to the account as well. To learn more about Global Privacy Control, you can visit https://globalprivacycontrol.org/ . Other than the Global Privacy Control, we do not recognize other “Do Not Track” signals that may be sent from your web browser or device.
> How We Disclose Personal Information
> In certain circumstances, we may disclose your personal information to third parties for contract fulfillment purposes, legitimate purposes and other reasons subject to this Privacy Policy. Such circumstances may include:
> With vendors or other third parties who perform services on our behalf (e.g., IT management, payment processing, data analytics, customer support, cloud storage, fulfillment and shipping).
> With business and marketing partners to provide services and advertise to you. Our business and marketing partners will use your information in accordance with their own privacy notices.
> When you direct, request us or otherwise consent to our disclosure of certain information to third parties, such as to ship you products or through your use of social media widgets or login integrations, with your consent.
> With our affiliates or otherwise within our corporate group, in our legitimate interests to run a successful business.
> In connection with a business transaction such as a merger or bankruptcy, to comply with any applicable legal obligations (including to respond to subpoenas, search warrants and similar requests), to enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.
> We have in the past 12 months disclosed the following categories of personal information and sensitive personal information about users for the purposes set out above in "How we Collect and Use your Personal Information" and "How we Disclose Personal Information" :
> Category
> Categories of Recipients
> Identifiers such as basic contact details and certain order and account information
> Personal information categories listed in the California Customer Records statute such as basic contact details and certain order and account information
> Commercial information such as order information, shopping information and customer support information
> Internet or other similar network activity, such as Usage Data
> Geolocation data such as locations determined by an IP address or other technical measures
> Vendors and third parties who perform services on our behalf (such as Internet service providers, payment processors, fulfillment partners, customer support partners and data analytics providers)
> Business and marketing partners
> Affiliates
> We do not use or disclose sensitive personal information without your consent or for the purposes of inferring characteristics about you.
> We have “sold” and “shared” (as those terms are defined in applicable law) personal information over the preceding 12 months for the purpose of engaging in advertising and marketing activities, as follows.
> Category of Personal Information
> Categories of Recipients
> Identifiers such as name, e-mail address and phone number
> Business and marketing partners
> Commercial information such as records of products or services purchased
> Business and marketing partners
> Usage Data
> Business and marketing partners
> Third Party Websites and Links
> Our Site may provide links to websites or other online platforms operated by third parties. If you follow links to sites not affiliated or controlled by us, you should review their privacy and security policies and other terms and conditions. We do not guarantee and are not responsible for the privacy or security of such sites, including the accuracy, completeness, or reliability of information found on these sites. Information you provide on public or semi-public venues, including information you share on third-party social networking platforms may also be viewable by other users of the Services and/or users of those third-party platforms without limitation as to its use by us or by a third party. Our inclusion of such links does not, by itself, imply any endorsement of the content on such platforms or of their owners or operators, except as disclosed on the Services.
> Children's Data
> The Services are not intended to be used by children, and we do not knowingly collect any personal information about children. If you are the parent or guardian of a child who has provided us with their personal information, you may contact us using the contact details set out below to request that it be deleted.
> As of the Effective Date of this Privacy Policy, we do not have actual knowledge that we “share” or “sell” (as those terms are defined in applicable law) personal information of individuals under 16 years of age.
> Security and Retention of Your Information
> Please be aware that no security measures are perfect or impenetrable, and we cannot guarantee “perfect security.” In addition, any information you send to us may not be secure while in transit. We recommend that you do not use insecure channels to communicate sensitive or confidential information to us.
> How long we retain your personal information depends on different factors, such as whether we need the information to maintain your account, to provide the Services, comply with legal obligations, resolve disputes or enforce other applicable contracts and policies.
> Your Rights
> Depending on where you live, you may have some or all of the rights listed below in relation to your personal information. However, these rights are not absolute, may apply only in certain circumstances and, in certain cases, we may decline your request as permitted by law.
> Right to Access / Know : You may have a right to request access to personal information that we hold about you, including details relating to the ways in which we use and share your information.
> Right to Delete : You may have a right to request that we delete personal information we maintain about you.
> Right to Correct : You may have a right to request that we correct inaccurate personal information we maintain about you.
> Right of Portability : You may have a right to receive a copy of the personal information we hold about you and to request that we transfer it to a third party, in certain circumstances and with certain exceptions.
> Restriction of Processing : You may have the right to ask us to stop or restrict our processing of personal information.
> Withdrawal of Consent : Where we rely on consent to process your personal information, you may have the right to withdraw this consent.
> Appeal : You may have a right to appeal our decision if we decline to process your request. You can do so by replying directly to our denial.
> Managing Communication Preferences : We may send you promotional emails, and you may opt out of receiving these at any time by using the unsubscribe option displayed in our emails to you. If you opt out, we may still send you non-promotional emails, such as those about your account or orders that you have made.
> You may exercise any of these rights where indicated on our Site or by contacting us using the contact details provided below.
> We will not discriminate against you for exercising any of these rights. We may need to collect information from you to verify your identity, such as your email address or account information, before providing a substantive response to the request. In accordance with applicable laws, you may designate an authorized agent to make requests on your behalf to exercise your rights. Before accepting such a request from an agent, we will require that the agent provide proof you have authorized them to act on your behalf, and we may need you to verify your identity directly with us. We will respond to your request in a timely manner as required under applicable law.
> Complaints
> If you have complaints about how we process your personal information, please contact us using the contact details provided below. If you are not satisfied with our response to your complaint, depending on where you live you may have the right to appeal our decision by contacting us using the contact details set out below, or lodge your complaint with your local data protection authority.
> International Users
> Please note that we may transfer, store and process your personal information outside the country you live in. Your personal information is also processed by staff and third party service providers and partners in these countries.
> If we transfer your personal information out of Europe, we will rely on recognized transfer mechanisms like the European Commission's Standard Contractual Clauses, or any equivalent contracts issued by the relevant competent authority of the UK, as relevant, unless the data transfer is to a country that has been determined to provide an adequate level of protection.
> Contact
> Should you have any questions about our privacy practices or this Privacy Policy, or if you would like to exercise any of the rights available to you, please call or email us at jobplugx@gmail.com or contact us at 19931 Faye Oaks Drive, Humble TX 77346, United States.