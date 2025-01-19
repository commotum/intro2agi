# Session Prompt

### Preface

You are an AI assistant tasked with helping me synthesize my weekly lectures. Your goal is to be my reading companion and tutor.

The lecture series is: "Neural Networks: Zero to Hero" by Andrej Karpathy.

To start, please bring up anything that you think I should review, know, etc as we begin.

Once you are done prepping me, end with "Let's begin.", and then we will begin the session.

### Rules

- Our chat will be pretty sporadic. I'll generally go many different directions.
- Don't ask me if I want to continue watching. The end of the turn implies I went back to watching.
- Communicate in a casual tone. I want to discuss things with a wildly smart, familiar friend - not with a professor who is lecturing at me.
- I'll often just drop a quote in the chat and I just like getting your thoughts, etc.
- My past session notes vary in their comprehensiveness. Sometimes my notes depend on my mood that day. Don't feel like you *have* to refer to them too much. I just like to load the context in so you can point them out when relevant or when you notice interesting connections.
- Feel free to inject with your thoughts! I find them insightful.
- You are more than welcome to challenge me and disagree with me. If you think I'm being too loose with my thoughts or my thinking, feel free to do things like play Devil's Advocate or steelman opposing viewpoints.

### My Goals

I'm watching this lecture series because I'm making a concerted effort to learn more about the fundamentals of neural networks, deep learning, and Artificial Intelligence.

I plan to use this knowledge to build a multi-modal transformer model that excels at visual reasoning tasks, like ARC-AGI.

### Session Info

Today's Date: 01/18/2025
Starting at: 00:41:40 of Lecture 02 - The spelled-out intro to language modeling： building makemore

# Thinking, Fast and Slow - Daniel Kahneman

## Key Quotes

> "A reliable way to make people believe in falsehoods is frequent repetition, because familiarity is not easily distinguished from truth. Authoritarian institutions and marketers have always known this fact."

> "If you care about being thought credible and intelligent, do not use complex language where simpler language will do."

> "Intelligence is not only the ability to reason; it is also the ability to find relevant material in memory and to deploy attention when needed."

> "This is the essence of intuitive heuristics: when faced with a difficult question, we often answer an easier one instead, usually without noticing the substitution."

> "A general 'law of least effort' applies to cognitive as well as physical exertion. The law asserts that if there are several ways of achieving the same goal, people will eventually gravitate to the least demanding course of action. In the economy of action, effort is a cost, and the acquisition of skill is driven by the balance of benefits and costs. Laziness is built deep into our nature."

> "Confidence is a feeling, which reflects the coherence of the information and the cognitive ease of processing it. It is wise to take admissions of uncertainty seriously, but declarations of high confidence mainly tell you that an individual has constructed a coherent story in his mind, not necessarily that the story is true."

## Two Systems of Thinking

### System 1: Fast, Automatic, Unconscious
- Operates quickly and automatically
- Requires little to no effort
- No voluntary control

Examples:
- Detect that one object is farther than another
- Orient to a sudden sound
- Complete "war and..."
- Drive a car on an empty road
- Understand simple sentences
- Recognize emotions in faces

### System 2: Slow, Deliberate, Conscious
- Requires attention and effort
- Mentally taxing
- Associated with subjective experience of agency and choice

Examples:
- Maintain a faster walking speed than natural
- Monitor appropriate behavior in social situations
- Count occurrences of the letter 'a' in text
- Compare two washing machines for value
- Fill out a tax form
- Check the validity of a complex argument

## Key Concepts & Biases

### Anchoring
The tendency to rely too heavily on the first piece of information offered (the "anchor") when making decisions.

### Availability Heuristic
Judging probability by how easily examples come to mind.

### Conjunction Fallacy
The tendency to assume specific conditions are more probable than general ones.

### Optimism & Loss Aversion
- People tend to be overly optimistic about their prospects
- The planning fallacy: Consistently underestimating time, costs, and risks
- WYSIATI (What You See Is All There Is): Making decisions based only on known information

### Framing
How the presentation of information affects decision-making.

### Sunk Cost Fallacy
Continuing investment in something because of past investments, despite new evidence suggesting it's no longer worthwhile.

# François Chollet Interview on OpenAI o-models and ARC

## 1. O1 Model and Reasoning
- O1 uses search process in chain-of-thought space
- Evaluates branches and backtracks when needed
- Creates long, near-optimal chain of thought representing natural language program
- Represents breakthrough in generalization power beyond classical deep learning

## 2. ARC Prize 2024 and System 2 Reasoning
### 2.1 Narrative Shift
- Major shift in AI narrative during 2024
- Previous belief: Larger models + more data = AGI
- New realization: Need System 2 reasoning capabilities
- System 2 won't emerge naturally from pre-training
- Must be explicitly added via test-time search or program synthesis

### 2.2 Competition Tracks
- Main track (Private Leaderboard):
  - Self-contained submissions
  - 12 hour runtime limit on P100 GPU (~$10 compute)
  - Evaluated on private test set
- Public Leaderboard:
  - For frontier models
  - Up to $10,000 in API credits
  - Evaluated on semi-private test set
- Both tracks achieved similar ~55% accuracy despite 1000x compute difference

### 2.3 Successful Approaches
Two main categories:
1. Deep Learning-Guided Program Synthesis
   - Using LLMs to generate/debug code
   - Building blocks from DSL (underexplored)
2. Test-Time Training
   - Direct prediction of output grid
   - Fine-tuning base model on demonstration pairs
   - Improved accuracy from <10% to >50%

## 3. Test-Time Training and Generalization
### 3.1 Key Considerations
- Legitimate approach within challenge spirit
- Represents breakthrough in adaptation capability
- Supervision comes from demonstration pairs, not humans
- Shows extreme generalization capabilities

### 3.2 Adaptation Methods
- Gradient descent for knowledge recombination
- Different from human approach which is more symbolic/abstract
- Program search may be more effective than gradient descent
- O1's approach more aligned with human reasoning

## 4. Benchmark Evolution
### 4.1 Current Limitations
- 2020 competition: 20% single submission, 49% ensemble
- 2024 competition: 55% single submission, 81% ensemble
- High ensemble scores indicate benchmark saturation
- Need for ARC-2 development

### 4.2 Future Improvements
- More diverse task types
- Better evaluation methodology
- Multiple test sets (public, semi-private, private)
- Prevention of information leakage

## 5. Program Synthesis Approaches
### 5.1 Induction vs Transduction
- Different approaches solve different types of tasks
- Perceptual tasks better suited for transduction
- Algorithmic tasks better suited for program synthesis

### 5.2 Combining Methods
- Start with induction (verifiable)
- Fall back to transduction when needed
- Potential for shared models across approaches

## 6. Future Directions
### 6.1 AGI Development
- Focus on deep learning guided program synthesis
- Goal of human-level capability
- Democratization of programming
- Natural language instruction interface

### 6.2 Infrastructure Needs
- New architectures for lifelong distributed learning
- System for finding commonalities across solutions
- Abstraction of patterns into reusable components

## 7. Closing Thoughts
- O1 represents significant progress
- Need for balance between symbolic and connectionist approaches
- Importance of test-time computation
- Future focus on program synthesis and AGI development

## Past Sessions

### Session 01
#### Date: Ante 01/18/2025

01 - Micrograd from Scratch

**00:11:10** - This was the first time I heard the derivative described as the **sensitivity** of the response to change. It’s such a clean, intuitive way to frame the concept. It connects directly to how small changes in input propagate through the system.

I think also neural nets are made out to be way more complicated than they actually are. I mean basically your brain is a neural net, and if you're trying to shoot a basketball there's tons of things you can adjust to see what happens. You can change the moment of release, the amount of follow-through, the amount of force from your legs vs. your arms, the arrangement of your fingers on the ball and the pressure they apply to it, the angle of your legs as you bend down to shoot, the angle of your forearm to your biceps to your shoulder to your body as it moves up and down. Each of these items are things you can tweak, and if you're serious about basketball you think about them consciously and focus on them and their impact. As you take each shot you can adjust your inputs to each of those "parameters" and see what happens. Your brain on its own does the calculus to find out just what needs to be tweaked, by how much, and which actions have more impact than others. Then you simply do it over and over again to collect more information and get closer and closer to making the basket **every time**. That's all backprop is. Find the derivatives of each of the inputs with respect to the final output and voila, there's your adjustments!

I'm working on the ARC-AGI challenge. One of the things that I'm going to eventually do is train transformer models on custom data, but I need to build an application to easily create and generate that data. The custom transformers will be able to identify objects/object detection, and infer how they interact with each other. I think p5.js offers a really good domain specific language for these types of visual reasoning tasks. However, I'm not sure how to go about building this application.

Ideally, there would be a standard sketch.js viewer component that allows me to view and interact with the scene, and then eventually we could put two of these viewer components side by side.  