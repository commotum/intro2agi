# Beyond the Pipe Dream
## The Missing Components of AI-Powered Personalized Learning  
**Jake Peterson**  
*peterj29@oregonstate.edu*  
**Devlin Montfort**  
*devlin.montfort@oregonstate.edu*  
**November 6, 2024**

---

### Abstract

At its core, the fundamental challenge of learning is one of feedback loop velocity - the speed at which a learner can identify gaps in understanding, apply targeted correction, and integrate that new knowledge. One-on-one instruction has historically proven superior precisely because it maximizes this feedback velocity while simultaneously eliminating the noise and friction that plague traditional educational models. The instructor can instantly detect confusion through verbal and non-verbal cues, immediately adjust explanations, and maintain sustained attention on the learner’s specific needs, creating what learning theorists call “high-bandwidth” educational transfer.

Yet the quality of this high-bandwidth transfer rests largely on the instructor’s personal development of three highly sophisticated mental models, and their skillful and coordinated deployment during instruction. The first is a deep, reflexive grasp of the subject matter that enables instant, accurate responses. The second, a dynamic map of the student’s evolving understanding that reveals exactly where attention is needed. And the third, a rich model of pedagogy itself - the hard-won wisdom of how concepts build, where students typically stumble, and when to push versus pivot. These interlocking models, refined through experience and constantly updated in real-time, are what allow an expert instructor to maintain the rapid feedback cycles that make one-on-one instruction so powerful.

We examine three fundamental limitations in the transformer architecture, the backbone of today’s most advanced Large Language Models, that prevent AI systems from developing and coordinating these sophisticated mental models. We also propose straightforward and specific technical solutions for each of these limitations. These architectural modifications offer promising pathways toward AI systems capable of facilitating the rapid feedback loops necessary for truly personalized learning.

---

## 1 Introduction

The promise of artificial intelligence in education has captured imaginations and venture capital alike, with each passing month bringing new proclamations of an imminent revolution in personalized learning. Yet beneath the techno-optimistic rhetoric lies a concerning pattern: when pressed for concrete mechanisms by which AI will transform education, advocates often invoke complexity and scale as self-evident justification, revealing a fundamental misunderstanding of both pedagogical needs and technological limitations.

This pattern is depressingly familiar - the 1980s saw widespread enthusiasm for “interactive learning” through early computer programs and multimedia CD-ROMs, followed by the 1990s and 2000s wave of online learning platforms and MOOCs. Each wave promised to replicate the dynamics of personalized instruction at scale, and each ultimately fell short of transforming educational outcomes. Today’s AI hype cycle follows this same trajectory, making bold claims about personalization while failing to address the fundamental challenges that doomed its predecessors.

At its core, the fundamental challenge of learning is one of feedback loop velocity - the speed at which a learner can identify gaps in understanding, apply targeted correction, and integrate that new knowledge. While previous generations of educational technology offered acceleration through on-demand interactivity, their restriction to narrow, pre-programmed pathways of instruction were inflexible and prohibitively labor-intensive. In fact the absence of pre-programmed instructional content, and ability to react to unforeseen circumstances, is precisely what makes an artificially intelligent tutor so enticing.

While popular discourse around AI’s shortcomings focuses heavily on concerns about factual accuracy and hallucinations, these limitations will soon fade to irrelevance, solved by ever-increasing scale of compute, data, and engineering. In fact, The Scaling Hypothesis is the core theory underpinning the operations of every major AI organization today. Our research, however, identifies three fundamental, ruthlessly scale-resistant, barriers to achieving the kind of rich, adaptive educational experience that effective personalized learning demands.

---

### 1.1 Visual Processing Limitations

The first major barrier is Large Language Models’ (LLMs) limited ability to process and communicate visual information, relying solely on text-based input rather than integrating visual data like graphs, charts, or spatial layouts. This restriction makes it challenging for them to interpret or create visual representations, which are crucial for explaining concepts in fields like math, physics, and data analysis. For example, LLMs can describe how to plot a graph or analyze trends, but they can’t dynamically generate or interpret visuals in real time, making their explanations feel incomplete for topics that benefit from visual aids. Without access to non-textual forms of knowledge, LLMs miss a critical dimension of understanding, one that often enhances clarity and facilitates deeper learning.

---

Perfect—here’s the full augmented **1.2** and **1.3** with your notes fully integrated, emphasizing structure, persistent goals, and tacit pedagogical knowledge acquisition.

---

### 1.2 Memory and Goal Tracking

The second barrier lies in LLMs’ lack of persistent memory and structural goal representation. Transformer-based models operate in a fundamentally reactive mode, bound by the window of tokens in a given prompt. They do not retain a structured model of the learner over time, nor can they plan across multiple interactions. Their idea of "progress" is entirely local to the current conversation. Without memory, there is no curriculum. Without goals, there is no pedagogy—only autocomplete.

A real tutor doesn’t just respond to input. It scaffolds learning, setting long-term objectives, adjusting based on past successes and failures, and revisiting core misunderstandings with strategic repetition. These are not just memory features—they are structural affordances. They require the system to model **trajectories of understanding**, not just generate plausible responses.

Attempts to simulate this with external session logs or fine-tuning still fail to capture what we believe is essential: **structured continuity**—a persistent, interpretable representation of what the learner knows, struggles with, and is ready to tackle next. In a truly personalized system, the model would maintain evolving maps of the learner’s conceptual terrain, allowing it to plan detours, circle back to confusion points, and explicitly mark milestones achieved. Until such structural memory mechanisms exist, the illusion of personal attention will remain just that—an illusion.

---

Perfect. Here’s **1.3** with all references to Commoncog and external materials removed, while preserving the refined logic, tone, and structural insight:

---

### 1.3 Tacit Knowledge and Pedagogical Content Intelligence

The third barrier is the absence of tacit pedagogical knowledge—those unspoken, experientially-acquired intuitions developed through countless hours of interaction with real learners. The most effective educators are not defined solely by their subject mastery. What distinguishes them is their **Pedagogical Content Knowledge (PCK)**: a refined understanding of how students typically misunderstand concepts, how to layer explanations over time, when to press or pivot, and how to tailor interventions to the individual.

This knowledge is inherently difficult to formalize. It is intuitive, nonverbal, context-sensitive, and often invisible even to the educator themselves. It resides in instincts about timing, sequencing, phrasing, and emphasis—skills that emerge from direct teaching experience rather than explicit instruction.

But while tacit, this knowledge is not inaccessible. It can be surfaced—not through annotation or introspection, but through **interaction and artifact**. The key is to design systems that collect pedagogical intelligence as a byproduct of tasks instructors already find meaningful.

Rather than asking instructors to externalize their tacit knowledge directly, we instead use AI to generate candidate teaching artifacts—examples, test items, explanations, or exercises—that would ordinarily require significant time and effort to create from scratch. The instructor’s role becomes one of selection and refinement: choosing the better of two AI-generated responses to a student, rejecting a flawed test question while optionally noting why it misfires, or tweaking a practice problem to better reveal a common misunderstanding.

Each of these methods allows instructors to reflect on their own practice while simultaneously producing structured data. Rather than reducing pedagogy to a set of rules, this approach embraces its richness and variability—making expert teaching decisions more visible, transferable, and scaffoldable. By reviewing AI–student interactions, refining proposed learning trajectories, or rejecting weak examples, instructors provide high-signal corrections that encode structural pedagogical expertise. The AI handles the generative overhead; the instructor shapes its direction—transforming tacit knowledge into feedback loops that future systems can internalize.