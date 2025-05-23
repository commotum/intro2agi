

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



## Historical Phases of AI Development

### Phase 1 - Symbolic AI / GOFAI (1950s-1980s)
- **Core Approach**: Leverages human knowledge to hand-encode rules and symbols
- **Success Metric**: How well it matches human expert reasoning
- **Verification**: Requires human experts to verify correctness
- **Key Limitation**: Can't adapt or improve itself; knowledge is static
- **Example**: Expert systems for medical diagnosis

### Phase 2 - Computational Search & Optimization (1990s)
- **Core Approach**: Leverages massive computation to explore solution spaces systematically
- **Success Metric**: Concrete performance metrics (win/loss in chess)
- **Verification**: Can evaluate its own moves through clear victory conditions
- **Key Limitation**: Only works for domains with well-defined rules and goals
- **Example**: Deep Blue

### Phase 3 - Deep Learning (2010s-present)
- **Core Approach**: Leverages data + computation to learn patterns and representations
- **Success Metric**: Performance on held-out test data aka training/validation data
- **Verification**: Can measure its own error and adjust accordingly
- **Key Limitation**: Quality/verification still depends on human-curated datasets
- **Key Advance**: System can discover and verify its own features/knowledge
- **Example**: AlphaGo, GPT, DALL-E


### The Verification Principle
A key progression across phases:
1. Phase 1: Requires external (human) verification
2. Phase 2: Can self-verify but only in narrow, pre-defined domains
3. Phase 3: Can self-verify and self-improve across broader domains
4. Phase 4: Can self-verify and self-improve across all domains

This progression aligns with Sutton's "bitter lesson" - each phase moved further away from human-specified knowledge toward systems that could discover and verify knowledge themselves through computation and learning.

### Kepler's Faith and Scientific Inquiry

Kepler's work was motivated by his Christian faith. He believed that since God is rational, the universe must be as well. Because humans are made in God's image, we can, as he said, "think God's thoughts after Him." In other words, understanding the universe is possible.

In Kepler's famous quote, "think God's thoughts after Him," the word "after" carries deeper meaning beyond just temporal sequence. Rather than simply following God's thoughts in time, Kepler meant that humans can engage in understanding by thinking in ways that reflect and mirror God's own rational thought patterns. This stems from his belief that since humans are made in God's image, we have the capacity to grasp the rational principles God used in designing the universe.

For Kepler, scientific inquiry was a form of worship - by uncovering the mathematical laws governing nature (like his laws of planetary motion), he believed he was aligning his mind with divine reason and participating in understanding God's rational design of creation. The quote expresses his conviction that human reasoning can genuinely comprehend the universe because it operates in similitude to the divine rationality that structured it in the first place.


### Francois Chollet - Looking Back on ARC-AGI 2024

While people think we can move past these limitations by making architecture tweaks, they are right in a way. *It is always possible to take a deep learning model and modify its architecture to bake in some strong structural priors about the algorithmic problem you're trying to solve.* You can then use gradient descent to find a solution that will generalize.

However, this approach works by requiring a human engineer to first understand the task at hand and convert that symbolic understanding into a better architecture - one that is isomorphic to the causal structure of the problem in important ways. If you want to autonomously adapt to novelty, you cannot just require a human engineer to intervene in writing your architecture. The process has to be fully autonomous.

This raises the question: can you create an architecture search or architecture generation machine that will take a problem, identify the key elements of the problem structure that need to be baked into a new architecture, and then generate that architecture?

Some tasks are very perceptual in nature - they are effectively pattern recognition problems. These types of tasks are well-suited for transduction methods. Other tasks are much more algorithmic and discrete in nature. For these, you cannot provide an easy solution based on pattern recognition, but it is straightforward to write down an algorithm to produce the solution. 

In reverse, when looking at perceptual puzzles, it is very challenging to write solution programs for them. This is because the program would have to formalize many perceptual concepts that make intuitive sense to us but are actually very difficult to express programmatically.

The approach really depends on the nature of the problem. For some problems, program synthesis is simply not the right approach - perceptual problems fall into this category. Conversely, for other problems, particularly those that are algorithmic in nature, trying to use a pattern recognition machine is the wrong choice.

How do you think we could effectively combine induction and transduction methods?

Kevin Ellis and team are taking an interesting approach in their paper - they start with induction and fall back on transduction when needed. This is a smart strategy because induction is formally verifiable. You can run your candidate program on the demonstration pairs you have access to and verify two things: first, does it run? And second, does it produce the right result? If it does both, you can have high confidence that it will generalize.

With transduction, on the other hand, you're essentially guessing where the answer might be, without any way to verify if your guess is correct. One approach is to increase the sample size - make many independent guesses and look at which answers appear most frequently. This relies on the assumption that wrong guesses will be wrong for different reasons (leading to different wrong answers), while correct guesses will all be correct for the same reason (leading to the same right answer appearing more often). However, you still have no way to be 100% certain that your guesses are correct.

This is why it's smarter to start with induction - it gives you high confidence that your solution is correct. Only when induction fails should you fall back to transduction. In essence, induction should be the preferred method, with transduction serving as a backup approach when induction doesn't work.

Should we think of induction and transduction as being completely different? Hypothetically, if you used a shared model for doing both, could there be some crossover between them? 

Absolutely. In fact, this is something that some people in the competition have tried. They're using the so-called "omni arc" approach, where the team uses the same model to solve a range of different ARC-related tasks. This includes writing down programs, interpreting programs, doing transduction, generating more inputs, and so on - all these different tasks with one single model. This approach leads to learning better representations for the concepts found in ARC.

The basic intuition is that you can get the network to think about the symbolic version at the same time as the solution space. When you look at the same problem from different angles, you are more likely to come up with the true shape of the problem. This is especially true if your data structure of choice is a neural network, because neural networks have a tendency to latch onto noisy statistical regularities. If you're only targeting one problem and only using one input modality, you're much more likely to overfit to elements of noise within that problem.

However, if you force the same representations to work across many different views of the problem, two beneficial things happen. First, you get better information about the problem because there is knowledge transfer and information exchange between tasks (like trying to predict the output grid and trying to generate more input grids). Second, it acts as a regularization mechanism where the noise that you might be learning with one modality is countered by what you're learning with another modality.

Would you still call that process thinking? Is thinking a system two process, or would you call that thinking as well? It is a form of test-time search, except it's not a discrete search - it's based on gradient descent. I don't see why you couldn't implement some form of system two processing with that.

I wonder whether that breaks the analogy with human thinking. It's doing perceptual deliberation, which is quite an interesting category - doing deliberation in latent space.

I think one way to improve the process is that you could try to decode your latent programs back into a symbolic, discrete form. Then you can start doing local discrete search around the decoded programs. The benefit of that approach is that you would have the ability to actually run the programs and verify whether they work.

As long as you stay in latent space, even if you're doing this gradient descent guided search within latent space to find the best possible points that represent a target program, you are very much limited to guessing. You have no way to assert that what the latent space is telling you matches the reality on the ground. So the ability to decode back into real program space, write and run these programs would be a very good addition to the system.

If you yourself spent a year working on ARC, what would you do?

I'd be doing deep learning-guided program synthesis. I think the way people are doing deep learning-guided program synthesis today is wrong. Everyone is leveraging LLMs, which of course makes sense because they are very powerful tools that contain a lot of useful knowledge that can be applied to any problem. We've invested billions and billions of dollars into creating these tools, so not using them would feel like missing out on a lot of power.

However, I think it is not the right approach to treat program synthesis as just token-by-token code generation. The right way to think about a program is as a graph of operators and program search. Program synthesis is basically a tree search process. I think you're better off trying to use deep learning models, and in particular LLMs, to guide that search process. This is not something that many people are trying today, but I think this would be closer to the right approach.

Another thing that people are not doing today, but should be doing, relates to how humans solve ARC puzzles. When humans solve these puzzles, they don't try many different solution programs in their mind - they only try a few.

I think humans have the capability to first describe a model of what they see and use this model effectively. They describe a grid in terms of the objects it contains, its contents and their properties, and their relationships with other objects, with a particular focus on causal relationships.

These descriptive models can be used to constrain the search space when looking at input-to-output programs. This is why we only need to consider a handful of programs before finding the correct one. In this sense, it might be possible to do enough modeling of the task to almost make search irrelevant - to almost entirely remove the need for search.

The next step of evolution is guiding the search. And I think we're starting to see this enlightenment in the use of LMS in many commercial bits of software. So, for example, the original LLM in an app was you just have a chatbot and you just stick it in there. Now things like cursor, for example, they're exposing a low level API and they're using tool use and so on. And the LLM is actually guiding the low level, you know, API interactions in the app. And so you're advocating for a similar evolution here where the LLM actually guides the discreet search process rather than just generating code. That's right. And the idea being that By creating your program via this iterative search process, you actually have the ability to make targeted modifications to your program graph. That would be significantly harder to make.

I think if you just treat the program as just a sequence of tokens. And also you can you're changing the nature of the space in which you are making addition decisions. Right. And graphs are just the natural data structure to represent programs. Programs are not sequences of tokens.

Any other avenues for arc that you're interested in? By the way, I think you spoke with George from Symbolica, and he had this kind of program verification approach that he said he discussed with you. Yes. So what we discussed is what you described to me is basically this idea of using a symbolic process to turn a problem definition, a task into a deep learning architecture, and then training deep learning architecture. I think that's a very, very original approach. I don't think there's anyone else, to the best of my knowledge, working on something similar. So I'm very curious about what it's going to be doing with it. It sounds fascinating.

What's your opinion on using a programming language like Python, a Turing complete language, versus using a DSL in these approaches?

Well, I think using a DSL like for Arc, for instance, is fundamentally limiting. No matter what you do, no matter what base language you're using, you should be able to learn the functions that you're applying from the data that you have. In fact, you should be able to do this as a lifelong process.

Every time you find a new task and you're solving it in the process, you're going to be coming up with useful abstractions, maybe abstractions that relate to problems you've seen in the past. You're going to want to turn that into reusable functions, reasonable building blocks, and store them so that the next time you come across a similar problem, you can reapply the same building blocks and save compute. This allows you to solve an equally difficult problem in fewer steps.

So no matter what you do, you want to learn the language that you're going to be using. And of course, that could mean learning the DSL. That could also mean using something like Python, but within it, increasingly writing higher order functions and classes and other reusable building blocks to enrich your language.

So you commented in your tweet about consciousness. You suggested that all system two processing involves consciousness. Can you explain more what you mean by that?

Any sort of explicit step-by-step reasoning needs to involve awareness. In reverse, if there's any cognitive process that you're running unconsciously, it will not have this strong self-consistency guarantee - it will be more like a dream or hallucination. The basic idea is that if you're just iteratively guessing, unless you have this strong self-consistency guarantee, you will end up drifting and diverging. Consciousness acts as the self-consistency guardrail. This is why you cannot have system two without consciousness.

What is your definition of reasoning? I don't really have a single definition of reasoning - I think it's a pretty loaded term that can mean many different things. There are at least two common ways the term is used, and they're actually quite different.

For instance, if you're just memorizing a program and then applying that program, you could say that's a form of reasoning. Like in school when you're learning the algorithm for multiplying numbers - while you're learning that algorithm, then when you have a test you're actually applying it. Is that reasoning? Yes, I think that's one form of reasoning. It's the kind of reasoning that LLMs and deep learning models in particular are very good at - you're memorizing a pattern, and at test time you're fetching the pattern and reapplying it.

But another form of reasoning is when you're faced with something never seen before, and you have to recompose and recombine your cognitive building blocks, your access to knowledge, and so on into a brand new model on the fly. That is also reasoning, but it's a very different kind of reasoning that underlies very different capabilities.

So I think the important question about deep learning models and LLMs in particular is not whether they can reason - there's always some sense in which they are doing reasoning. The more important question is: can they adapt to novelty? There are many different systems that could just memorize programs provided by humans and then reapply them. What's more interesting is whether they can come up with their own programs and abstractions on the fly.

What would it mean for a system to come up with its own abstractions? First, you need to be solving novel problems. Solving a novel problem means starting from some base of knowledge and building blocks, then being faced with a new task. You recombine them into a model of the task and apply this model successfully. As you solve many problems, you start noticing that some patterns of recombination happen often. When you notice this, you can tag and abstract these patterns, refactoring them into a more reusable form. Then this reusable form can be added back to your set of building blocks. So the next time you encounter a similar problem, you can solve it in fewer steps, expending less energy because you have access to this higher level abstraction that fits the problem.

Is there a way of measuring the strength of reasoning? Again, you would need to start by precisely defining what you mean by reasoning. You can precisely define generalization power, which is basically the amount of novelty a system can adapt to. It's quite interesting because you could define it in terms of performance - how good is my model? Another way of describing it is to imagine reasoning purely as traversing the deductive closure - just composing together knowledge we already have in new configurations. Then we make that leap in solution space because we found a new model that works really well.

Is there an intrinsic way of measuring the type of model rather than its generalization power? No, I think you really have to observe what the model does. You cannot just inspect the model and determine how strong it is at reasoning. There's no intrinsic form of "this is good reasoning." Given two models of a problem, can you just look at them and tell which one is better? I think it's very much goal-dependent. You cannot really evaluate a model like a simulation without having something you want to do with it. But if you do have a goal, then you look at the causal factors required to achieve that goal. The best model is probably the simplest one that retains these causal factors.


New Approaches inspired by ARC // Possible Approaches to ARC:
1.  Build an entirely new architecture specifically for ARC.
    Basically, an architecture isomorphic to the problem structure.
    Requires human engineers to understand the task and map its causal structure to the architecture.
2.  Build the machine to build the machine.
    Fully Autonomous Architecture Search.
    Design systems to autonomously generate architectures based on problem structure without human intervention.
3.  Take an open source LLM and train it on the arc problem data.
    LLMs don't have strong spatial reasoning.
    Tokens are not 1:1 to our understanding.
4.  

here are the distinct approaches/strategies discussed:

1. **Architecture Tweaks with Strong Structural Priors**  
   - modify deep learning models to bake in priors about the algorithmic problem being solved.  
   - requires human engineers to understand the task and map its causal structure to the architecture.

2. **Fully Autonomous Architecture Search**  
   - design systems to autonomously generate architectures based on problem structure without human intervention.

3. **Induction vs. Transduction**  
   - **Induction**: formally verifiable reasoning by testing candidate solutions for correctness.  
   - **Transduction**: pattern recognition and heuristic guessing without strong verification mechanisms.  

4. **Combination of Induction and Transduction**  
   - start with induction for high confidence; fall back on transduction when induction fails.  
   - verify transduction guesses by aggregating frequent correct answers across independent trials.

5. **Omni Arc Approach**  
   - use a single model to perform multiple tasks, such as program synthesis, transduction, and pattern recognition.  
   - forces shared representations and regularizes learning, reducing noise and promoting knowledge transfer.

6. **Latent Space Search with Gradient Descent**  
   - perform solution search in latent space guided by gradient descent.  
   - decode latent programs back into symbolic forms for discrete verification and search.

7. **Deep Learning-Guided Program Synthesis**  
   - treat program synthesis as a tree or graph search process rather than token-based generation.  
   - use deep learning to guide search rather than directly generating solutions.

8. **Descriptive Task Modeling**  
   - model tasks in terms of object relationships, causal structures, and properties to constrain the solution search space.  
   - emulate human problem-solving by reducing the number of candidate solutions needed.

9. **Reusable Abstractions through Lifelong Learning**  
   - solve problems, identify reusable patterns, and abstract them into building blocks for future tasks.  
   - dynamically expand the language (DSL or Python) used for solutions.

10. **Symbolic Processes to Generate Architectures**  
   - convert problem definitions into architectures through symbolic reasoning, then train those architectures with deep learning.  

11. **Step-by-Step vs. Novel Problem Reasoning**  
   - **Step-by-step**: reasoning by memorizing and applying algorithms.  
   - **Novel problem solving**: recombine knowledge and abstractions to create new solutions on the fly.

12. **Explicit Reasoning and Self-Consistency through Consciousness**  
   - explicit reasoning involves awareness, providing self-consistency and avoiding divergence akin to dreams or hallucinations.

13. **Abstraction-Driven Efficiency**  
   - refactor frequent recombination patterns into higher-level abstractions to reduce problem-solving complexity and effort over time.

14. **Goal-Dependent Model Evaluation**  
   - evaluate models based on causal factors and simplicity in achieving a specific goal, rather than intrinsic properties of reasoning strength.

this set captures the variety of approaches to problem-solving, architecture generation, and reasoning discussed.

### Building the Machine that Builds the Machine

1. How do you choose/find a problem to solve?
2. How do you find/come up with a solution?
    - Search
    - Deep Learning Guided Program Synthesis with LLMs
        - Trying to generate a code or formula that solves the problem for the demonstration pairs.
        - Uses induction
        - DLGPS using building blocks from a Domain Specific Language (under-explored)
    - Test-Time Training where an LLM is fine-tuned on the demonstration pairs at test time
        - Uses transduction
        - Direct prediction of output grid
        - Fine-tuning base model on demonstration pairs
        - Improved accuracy from <10% to >50%
        - tendency to overfit to the demonstration pairs
        - Uses gradient descent for knowledge recombination
        - What Humans do is much more abstract and symbolic than this, closer to functional composition than gradient descent
        - So the key question is, can you create an architect, or an architecture generation machine, that will take a problem, identify the key elements of the problem's structure which you would need to bake into your new architecture and then generate the architecture?
3. How do you know if your solution is good?
    - Verification Methods
        - Induction: Run the program on the demonstration pairs and verify that it produces the correct output
        - Transduction: Run the program a large number of times and verify that it produces the correct output most of the time (stochastic sampling)
4. How do you get better at solving that problem?
    - Learning





LISP (LISt Processing) was developed by John McCarthy at MIT in 1958, with the first implementation completed in 1960. This actually predates many of the early AI developments I listed!

Let me revise the early timeline:

**1950s: Foundational Period**
- 1950: Turing Test proposed ("Computing Machinery and Intelligence")
- 1956: Dartmouth Conference coins "Artificial Intelligence"
- 1958: LISP developed by McCarthy
- 1959: Perceptron invented by Frank Rosenblatt

**1960s: Early Languages & Systems**
- 1960: First LISP implementation completed
- 1964: Joseph Weizenbaum creates ELIZA
- 1965: First expert systems developed
- 1969: Limitations of perceptrons shown by Minsky & Papert

LISP is particularly significant because:
1. First language specifically designed for AI
2. Introduced many fundamental programming concepts:
   - Tree data structures
   - Automatic garbage collection
   - Dynamic typing
   - First-class functions
3. Became the dominant AI programming language for decades
4. Still influences AI and programming language design today

LISP was central to the symbolic AI/GOFAI approach, making it a key part of Phase 1 in our earlier paradigm discussion. It was designed to manipulate symbols and lists, perfect for the rule-based systems of early AI.




In 2006, Hinton and his team published a breakthrough paper on "Deep Belief Networks" that helped restart interest in deep learning. Here's what was significant:

**The Problem They Solved:**
- Deep neural nets weren't working well at the time
- Training deep networks with gradient descent was failing
- Networks got stuck in poor solutions
- The "vanishing gradient problem" meant deep layers weren't learning

**The Innovation:**
1. **Layer-wise Pre-training**
   - Instead of training the whole network at once
   - Train one layer at a time, from bottom to top
   - Each layer learns to reconstruct its input
   - Used "Restricted Boltzmann Machines" (RBMs) for each layer

2. **Why It Worked:**
   - Pre-training gave better initialization for weights
   - Each layer learned useful features before final training
   - Helped gradients flow better in deep networks
   - Proved deep architectures could be trained effectively

**Historical Impact:**
- Renewed interest in deep neural networks
- Showed deep architectures could learn useful features
- Started the modern deep learning revolution
- Led to explosion of work in deep learning

Interestingly, the specific technique (RBMs and pre-training) isn't widely used today. We solved the deep learning training problem differently:
- ReLU activations
- Better initialization schemes
- Residual connections
- Batch normalization
- More computation and data

But Hinton's work was crucial because it:
1. Proved deep networks could work
2. Got people excited about deep learning again
3. Started the research momentum that led to modern solutions

This fits "The Bitter Lesson" because while the specific solution (pre-training) wasn't the final answer, it sparked the research that led to our current approaches that leverage computation and learning.






Yes! LeCun's CNN used backpropagation and gradient descent for training. This was actually one of its major achievements - showing that you could effectively train a deep convolutional architecture using gradient descent.

Key points about the training:
1. **Backpropagation Through Convolutions**
   - Had to figure out how to compute gradients through convolutional layers
   - Showed that weight sharing didn't prevent effective gradient flow
   - Proved deep architectures could be trained end-to-end

2. **Challenges They Faced**
   - Vanishing gradients were a major issue
   - Training was slow with available compute
   - Needed careful initialization and learning rates
   - No ReLU activation functions yet (used sigmoid/tanh)

This is why AlexNet (2012) was such a breakthrough later:
- ReLU activations helped with gradient flow
- GPU acceleration made training much faster
- Dropout helped with regularization
- Larger datasets provided more signal for learning

So while LeCun's work proved CNNs could be trained with gradient descent, it took about 20 more years of advances in:
1. Computing power (GPUs)
2. Architecture improvements (ReLU, better initialization)
3. Training techniques (dropout, batch norm)
4. Dataset size (ImageNet)

...before CNNs reached their full potential. Again, supporting Sutton's thesis about the importance of computation and scale.






Yes! LeCun's CNN used backpropagation and gradient descent for training. This was actually one of its major achievements - showing that you could effectively train a deep convolutional architecture using gradient descent.

Key points about the training:
1. **Backpropagation Through Convolutions**
   - Had to figure out how to compute gradients through convolutional layers
   - Showed that weight sharing didn't prevent effective gradient flow
   - Proved deep architectures could be trained end-to-end

2. **Challenges They Faced**
   - Vanishing gradients were a major issue
   - Training was slow with available compute
   - Needed careful initialization and learning rates
   - No ReLU activation functions yet (used sigmoid/tanh)

This is why AlexNet (2012) was such a breakthrough later:
- ReLU activations helped with gradient flow
- GPU acceleration made training much faster
- Dropout helped with regularization
- Larger datasets provided more signal for learning

So while LeCun's work proved CNNs could be trained with gradient descent, it took about 20 more years of advances in:
1. Computing power (GPUs)
2. Architecture improvements (ReLU, better initialization)
3. Training techniques (dropout, batch norm)
4. Dataset size (ImageNet)

...before CNNs reached their full potential. Again, supporting Sutton's thesis about the importance of computation and scale.



LeCun's breakthrough with CNNs (Convolutional Neural Networks) in 1989, particularly with LeNet, had several key innovations:

**Key Technical Advances:**
1. **Convolutional Layers**
   - Instead of connecting every neuron to every input (fully connected)
   - Used sliding "filters" that look at small patches of the image
   - Same filters reused across the entire image
   - This dramatically reduced parameters while capturing spatial patterns

2. **Weight Sharing**
   - The same convolutional filters are applied everywhere
   - This builds in translation invariance - patterns can be recognized regardless of where they appear
   - Massively reduces parameters compared to fully connected networks

3. **Local Connectivity**
   - Each neuron only looks at a small region of the input
   - Mimics how biological visual systems process information
   - Helps capture hierarchical patterns efficiently

**Why It Was Revolutionary:**
1. **Efficiency**
   - Previous neural nets needed too many parameters for real images
   - CNNs could process larger images with far fewer parameters
   - Made training practical with available computing power

2. **Built-in Assumptions About Vision**
   - Leveraged known properties of visual data (spatial locality)
   - But didn't hard-code specific features like earlier approaches
   - Found sweet spot between hand-crafted and learned features

3. **Practical Success**
   - Successfully used for digit recognition (ZIP codes)
   - First deep learning system deployed at scale (check reading)
   - Proved neural nets could solve real-world problems

However, CNNs didn't achieve their full potential until:
- 2012: AlexNet with ReLU activation and GPU acceleration
- Larger datasets (ImageNet)
- More computing power
- Better training techniques

This illustrates Sutton's "bitter lesson" - LeCun had the right architecture in 1989, but it took advances in computation and data to realize its full potential.



The Turing Test was proposed by Alan Turing in his 1950 paper "Computing Machinery and Intelligence" published in the journal Mind. The paper begins with the famous question "Can machines think?"

However, I should note that Turing didn't actually call it the "Turing Test" - he called it "the imitation game." The term "Turing Test" was coined later by others.

The test was proposed as a way to sidestep philosophical debates about machine consciousness by providing a practical test of machine intelligence: if a human judge can't reliably distinguish between conversations with a machine and a human, the machine is considered to have passed the test.

So in my previous timeline, the 1950 date was correct, but it's worth noting that this predates even the term "Artificial Intelligence" which wasn't coined until the 1956 Dartmouth Conference. The Turing Test represents one of the earliest formal discussions about machine intelligence and how we might measure it.

This actually makes it even more remarkable - Turing was thinking about testing machine intelligence before we even had a formal field called AI, and his ideas about evaluation through natural language interaction are still relevant today with models like GPT-4 and Claude.

prolog (short for "Programming in Logic") is a logic programming language created in 1972 by Alain Colmerauer and Robert Kowalski. it was designed to handle symbolic computation and rule-based logical inference. prolog excels in problems requiring pattern matching, knowledge representation, and automatic reasoning, making it highly useful in:

1. **natural language processing (nlp):** early prolog systems were used to develop language parsers and understand semantic relationships in text.
2. **artificial intelligence (ai):** it supports tasks like expert systems, planning, and decision-making based on logical rules.
3. **knowledge representation:** prolog is well-suited for encoding relationships and hierarchical structures, such as genealogical trees or databases of facts.
4. **constraint solving:** it can solve combinatorial problems like scheduling, sudoku puzzles, or route planning.
5. **theorem proving:** its foundations in formal logic make it useful for mathematical proofs and verification tasks.

### what makes prolog unique?
- **declarative nature:** you define *what* a solution looks like rather than *how* to compute it.
- **logic-based inference:** it uses a mechanism called backtracking to explore possible solutions automatically.
- **unification:** variables and patterns are matched dynamically during execution, enabling powerful pattern-matching capabilities.

### structure
prolog programs consist of:
- **facts:** statements about the world (e.g., `parent(john, mary).`).
- **rules:** logical implications (e.g., `grandparent(X, Y) :- parent(X, Z), parent(Z, Y).`).
- **queries:** questions you ask the system to solve (e.g., `?- grandparent(john, Who).`).

it’s lightweight but can be mind-bending because thinking declaratively is a shift from procedural or object-oriented paradigms.

prolog was developed during the rise of the **expert systems era** in the 1970s and 1980s, when ai research focused on creating systems that could mimic human expertise in specific domains. expert systems required handling complex, rule-based knowledge and reasoning over it, which aligned perfectly with prolog's design. here’s how prolog simplified the development of expert systems:

### 1. **knowledge representation with facts and rules**
   - expert systems rely on a database of facts and rules to model domain knowledge.
   - prolog naturally supports this through its declarative syntax, where you can define facts (`parent(john, mary).`) and rules (`grandparent(X, Y) :- parent(X, Z), parent(Z, Y).`).
   - this made it intuitive to encode large knowledge bases without needing procedural code.

### 2. **logical inference**
   - expert systems require inference engines to deduce new facts from existing ones.
   - prolog has built-in backtracking and unification mechanisms that serve as a powerful inference engine, automatically exploring logical paths to find solutions.
   - developers didn’t have to write custom inference logic; prolog's core handled reasoning efficiently.

### 3. **goal-driven reasoning**
   - expert systems often work backward from a goal, asking, “how can we achieve this conclusion based on what we know?”
   - prolog supports this naturally through its query mechanism. for example, querying `?- grandparent(john, Who).` triggers backward reasoning to determine all `Who` that satisfy the relationship.

### 4. **declarative programming**
   - unlike procedural languages, where developers must specify *how* to achieve a result, prolog lets you define *what* the solution looks like.
   - this abstraction made it easier to focus on encoding expert knowledge rather than implementation details, reducing development time.

### 5. **prototyping and flexibility**
   - prolog’s flexibility allowed researchers to quickly prototype expert systems, testing and refining rules without rebuilding complex logic.
   - this was crucial for iterating on systems in fields like medical diagnosis, troubleshooting, and planning.

### notable impact
prolog was used in some early expert systems, such as:
- **mycin:** a medical diagnosis system for bacterial infections.
- **european airline scheduling systems:** managing crew and fleet assignments.
- **natural language question-answering systems:** simplifying communication with non-technical users.

prolog essentially served as a **ready-made toolkit** for building expert systems, letting developers focus on domain-specific logic while leveraging its built-in reasoning and inference capabilities. this significantly lowered the barrier to creating intelligent systems in an era where ai was primarily rule-based.





# IBM Deep Blue (1997)
*Human Expertise + Brute Force Search + Specialized Hardware + No Neural Networks*

## Components

### Opening Book - Database of pre-analyzed opening moves

Contained thousands of historically strong opening sequences from expert games. Allowed Deep Blue to play optimally without computation during the opening phase.

### Endgame Tablebase - Database of pre-computed closing sequences

Provided exact solutions for positions with a small number of pieces remaining. Allowed Deep Blue to play flawlessly in late-game scenarios.

### Evaluation Function - Calculates player advantage from heuristic board state

Inputs board state (value of each piece, King safety, pawn structure, control of center, etc.) and outputs score. Manually tuned by human chess experts and grandmasters.

### Search Engine - Brute-force search with alpha-beta pruning    

Exhaustive search explores a decision tree, 6-8 moves deep, to find the best sequence. If at any point, a branch cannot improve the current best outcome, that branch is pruned.

### Specialized Hardware - Custom-built hardware for parallel computation

Used 480 custom "chess chips", to evaluate ~200 million positions per second. No GPUs. Nvidia was founded in 1993, released their first GPU in 1997, and made GPUs programmable with the release of CUDA in 2007.

--------------------------------------------------

## DeepMind AlphaGo (2016)
*Deep Learning + Monte Carlo Tree Search + Policy Networks*

### Components

#### Policy Networks
*Neural networks trained to predict expert moves*

Two networks: one fast network for initial move suggestions and one deep network for detailed evaluation. Trained on 30 million positions from expert games to learn strong move patterns.

#### Value Network 
*Evaluates board positions without looking ahead*

Deep neural network trained through self-play to estimate win probability from any position. Provides fast evaluation without expensive search.

#### Monte Carlo Tree Search
*Guided exploration of possible move sequences*

Uses policy networks to suggest promising moves, then simulates many games from those positions. Combines fast pattern recognition with targeted search.

#### Training Pipeline
*Multi-stage training process*

1. Supervised learning on human expert games
2. Reinforcement learning through self-play
3. Distributed training across thousands of TPUs
4. Fine-tuning against previous versions

#### Hardware Infrastructure
*Google's Cloud TPU Clusters*

Leveraged Google's tensor processing units (TPUs) for massive parallel neural network training and inference. Used distributed computing to play millions of games against itself during training.

01 - Micrograd from Scratch

**00:11:10** - This was the first time I heard the derivative described as the **sensitivity** of the response to change. It’s such a clean, intuitive way to frame the concept. It connects directly to how small changes in input propagate through the system.

I think also neural nets are made out to be way more complicated than they actually are. I mean basically your brain is a neural net, and if you're trying to shoot a basketball there's tons of things you can adjust to see what happens. You can change the moment of release, the amount of follow-through, the amount of force from your legs vs. your arms, the arrangement of your fingers on the ball and the pressure they apply to it, the angle of your legs as you bend down to shoot, the angle of your forearm to your biceps to your shoulder to your body as it moves up and down. Each of these items are things you can tweak, and if you're serious about basketball you think about them consciously and focus on them and their impact. As you take each shot you can adjust your inputs to each of those "parameters" and see what happens. Your brain on its own does the calculus to find out just what needs to be tweaked, by how much, and which actions have more impact than others. Then you simply do it over and over again to collect more information and get closer and closer to making the basket **every time**. That's all backprop is. Find the derivatives of each of the inputs with respect to the final output and voila, there's your adjustments!

I'm working on the ARC-AGI challenge. One of the things that I'm going to eventually do is train transformer models on custom data, but I need to build an application to easily create and generate that data. The custom transformers will be able to identify objects/object detection, and infer how they interact with each other. I think p5.js offers a really good domain specific language for these types of visual reasoning tasks. However, I'm not sure how to go about building this application.

Ideally, there would be a standard sketch.js viewer component that allows me to view and interact with the scene, and then eventually we could put two of these viewer components side by side.  