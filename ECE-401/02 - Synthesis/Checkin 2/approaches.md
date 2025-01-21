# Approaches to Knowledge Integration

- You can program the knowledge into the architecture. (Scales with Researcher's knowledge)
- You can use a database to look up the knowledge. (Scales with Compute and Data)
- You can give the knowledge to a neural network as data to learn from. (Scales with Compute and Data)
- You can give a neural network a goal to achieve and it will find the knowledge. (Scales with Compute)

# The False Dichotomy of Expert Systems vs Scaling Compute

## Current Paradigm
The field has largely divided into two camps:

### Expert Knowledge Approach
- Manually program domain expertise into systems
- Carefully craft architectures and training objectives
- Focus on interpretability and controlled behavior
- Often viewed as limited by human knowledge

### Pure Compute Approach  
- Train massive models on broad datasets
- Allow capabilities to emerge naturally
- Scale parameters and compute extensively
- Exemplified by GPT's emergent abilities

## A More Nuanced View

The apparent tension between these approaches is largely artificial. The success of models like GPT-3 is often misinterpreted as evidence that specific training objectives make systems brittle. This ignores several key points:

### Why Targeted Training Can Work
- Skills can be generalizable if properly abstracted
- Learning one capability often transfers to others
- Careful curriculum design accelerates learning
- Guided exploration is more efficient than random search

### Benefits of Guided Learning
- More compute-efficient than pure scale
- Produces more reliable capabilities
- Enables better understanding of the system
- Maintains benefits of neural approaches

## Our Approach: Guided Skill Acquisition

Rather than directly programming knowledge or relying purely on scale, we:
- Design problems that teach generalizable skills
- Create curricula that build transferable concepts
- Guide learning toward useful abstractions
- Maintain flexibility of neural architectures

This approach combines the best of both worlds:
- Efficiency of expert guidance
- Flexibility of neural learning
- Scalability of compute
- Reliability of structured knowledge


# Approaches to ARC

## 3.1 Deep Learning-Guided Program Synthesis

### Overview
The ARC-AGI program synthesis benchmark, released in 2019, focuses on solving tasks by synthesizing programs. Deep learning models have been proposed to guide discrete program search processes, addressing the combinatorial explosion problem inherent in program synthesis.

Initial approaches in 2020 were dominated by brute-force program search. By 2023, large language models (LLMs) capable of generating code enabled more efficient solutions.

### Key Points
- **Problem Context**: Combinatorial explosion limits traditional program synthesis approaches.
- **LLMs' Role**: Introduced efficient program generation and debugging techniques.
- **Current Limitations**: Deep learning-guided methods have yet to decisively surpass DSL-based brute-force search, with both achieving ~40% scores under comparable compute budgets.
- **Future Directions**:
  - Specialist models for guiding discrete program search.
  - Formal efficiency reporting incorporating compute budgets.

### Program Synthesis Approaches

#### 1. **Brute-Force Search over a Domain-Specific Language (DSL)**
- **Method**: Exhaustively searches all possible programs within a DSL.
- **Strengths**: Theoretically complete.
- **Weaknesses**: Suffers from combinatorial explosion, limiting scalability.
- **Performance**:
  - Achieved 49% (ensemble of all 2020 competition entries).
  - Highest single submission score: 40% (Agnis Liukis, team name: alijs).

#### 2. **LLM-Powered Program Generation in General-Purpose Languages**
- **Method**: LLMs (e.g., GPT-4) generate candidate programs in Python based on task descriptions.
- **Evaluation**: Programs are executed by a code interpreter and selected based on performance.
- **Challenges**: 
  - Requires significant prompt engineering.
  - Computationally expensive due to evaluating large numbers of programs.
- **Performance Estimate**: 85% ARC-AGI score achievable with 100 million programs/task (multi-million dollar compute cost).

#### 3. **LLM-Guided Discrete Program Search over a DSL**
- **Method**: LLMs guide the search process within a DSL, reducing the search space and improving efficiency.
- **Strengths**: Combines the completeness of DSL-based search with the efficiency of LLMs.
- **Demonstration**: Ouellette (2021) demonstrated this strategy successfully.

#### 4. **LLM-Powered Iterative Program Debugging**
- **Method**: LLMs iteratively refine heuristically generated programs or correct errors in promising incorrect programs.
- **Demonstration**: Explored by Greenblatt (2023), improving ARC-AGI performance.

#### 5. **Specialist Models for Guiding Discrete Search** (Future Work)
- **Concept**: Use deep learning models to guide branching decisions in discrete program searches.
- **Inspiration**: Similar to Google's AlphaProof system.
- **Potential**: Expected to outperform current methods by improving decision efficiency.

### Conclusion
Deep learning-guided program synthesis is advancing but currently matches brute-force DSL-based search in performance. As compute budgets grow, formal benchmarks incorporating resource constraints will become critical. Specialist models and more efficient techniques promise future breakthroughs.



## 3.2 Test-Time Training (TTT)

### Overview
The classical deep learning paradigm relies on training models on large datasets and performing inference with a frozen model. However, solving ARC-AGI requires adapting models to specific tasks at test time, leading to the rise of **Test-Time Training (TTT)** as the dominant approach for LLM-based ARC-AGI solutions.

### Key Points
- **Classical Paradigm Limitation**: Static inference models fail to generalize, with no solution scoring above 11%.
- **TTT Process**: Fine-tunes a pretrained LLM on demonstration pairs at test time, creating task-specific model variants for output prediction.
- **Conceptual Comparison**:
  - **Program Search**: Deep recombination of generic primitives.
  - **TTT**: Shallow recombination of specialized vector functions using test-time gradient descent.
- **Future Outlook**: TTT expected to dominate for tasks outside pretraining but may face production hurdles until 2026.

### Key Components of TTT for ARC-AGI

#### 1. **Data Augmentation and Alternative Datasets**
- **Challenge**: Limited size of ARC-AGI-1 dataset.
- **Solutions**:
  - **Alternative Datasets**:
    - ARC-Heavy/ARC-Potpourri: 400,000 ARC-like tasks (Ellis et al. (19)).
    - Re-ARC: Infinite sampling of ARC-AGI training tasks (Hodel (13)).
  - **Data Augmentations**: ARChitects (10) introduced augmentations with a selection criterion based on solution stability.

#### 2. **Fine-Tuning Strategies**
- **Methods**:
  - **LoRA Fine-Tuning**: Efficient parameter updates for test-time adaptation.
  - **Full Fine-Tuning**: Adapts all model parameters to specific tasks.
- **Data Source**: Augmented demonstration pairs derived from test instances.

#### 3. **Specialized 2D-Aware Architectures**
- **Features**:
  - 2D attention mechanisms.
  - 2D position encodings for spatial relationships in input grids.
- **Example**: NVIDIA’s "A 2D nGPT Model for ARC Prize" (22).

### Notable Examples from ARC Prize 2024

- **OmniARC (Barbadillo (3))**:
  - Qwen2.5-0.5B-Instruct model.
  - Pretrained on program induction tasks and fine-tuned with augmented ARC data.
  - Combined with program synthesis for ensemble performance.
- **Akyürek et al. (1)**:
  - 8B parameter model.
  - Achieved 53% accuracy on the public evaluation set.
- **MindsAI (20)**:
  - Salesforce T5 series model.
  - Pretrained on the public evaluation set and synthetic data.
  - Fine-tuned on private tasks at test time.
- **ARChitects (10)**:
  - NeMo-Minitron-8B foundation model.
  - Extensive augmentations and stability-based selection criteria.

### Variants and Novel Approaches
- **Latent Space Search** (Bonnet and MacFarlane (4)):
  - Utilizes random search and gradient descent in LLM latent space to find optimal representations.
  - Combines aspects of test-time adaptation with a unique approach that avoids traditional fine-tuning or discrete search.

### Conclusion
TTT is poised to be the leading technique for LLM-based AI systems tackling novel tasks. While challenging to integrate into production systems, its performance advantages suggest widespread adoption (or derivatives) by 2026.


## 3.3 Combining Program Synthesis with Transduction

### Overview
ARC-AGI tasks can be approached using two primary methods: **Program Synthesis (Induction)** and **Transduction**. These approaches solve complementary subsets of tasks, making their combination essential for state-of-the-art performance.

### Key Methods

#### 1. **Program Synthesis (Induction)**
- **Definition**: Finds a program or function, based on demonstration pairs, that maps input grids to their corresponding output grids. This program is then applied to test input grids.
- **Strengths**: Well-suited for tasks requiring symbolic reasoning or generalization of observed patterns.
- **Limitation**: Limited by the scalability of program search techniques.

#### 2. **Transduction**
- **Definition**: Directly predicts output grids from demonstration pairs and a test input grid by leveraging LLMs, typically via prompt-based inference.
- **Strengths**: Effective for tasks requiring direct application of learned representations.
- **Limitation**: Dependent on the quality of LLM outputs, often requiring substantial prompt engineering.

### Insights and Observations
- **Distinct Task Solving**: Early research (Jack Cole and Mohamed Osman, 2023) revealed that program synthesis and transduction excel at solving different subsets of tasks.
- **Combined Approach**: Li et al. ("Combining Induction and Transduction for Abstract Reasoning," 19) showed that combining these methods addresses the weaknesses of each, enabling broader task coverage.

### Current Performance
- **Individual Methods**: 
  - Best transduction-only and induction-only submissions achieve ~40%.
- **Ensembles**: Combining program synthesis and transduction is essential for state-of-the-art results.
  - Examples:
    - **Akyürek and Berman**: Leading public leaderboard.
    - **ARChitects and Barbadillo**: Dominating the Kaggle leaderboard.

### Conclusion
The combination of program synthesis and transduction represents the leading paradigm for ARC-AGI, leveraging their complementary strengths to achieve superior task coverage. Future progress will likely depend on further refining the integration of these methods.


# Our Approach

> "It is easier to learn calculus than to discover it."

A modular neural architecture with three specialized components:

### 1. Sensory Node (Neural Network + Tools)
A perception module that takes an input image and generates:
- Natural language description of the image
- Code that could generate the image
- Intermediate representations for other nodes

### 2. Difference Detection Node (Neural Network + Tools)
A comparison module that takes two images and generates:
- Natural language description of differences between images
- Delta in generation code between images
- Similarity metrics and feature comparisons

### 3. Verification Node (Neural Network + Tools)
A validation module that:
- Processes generated images through the Sensory Node
- Compares original and generated images via Difference Detection
- Evaluates consistency between:
  - Natural language descriptions
  - Generation code
  - Visual features
- Outputs a similarity score and validation metrics

The three nodes operate in a continuous feedback loop, with the Verification Node providing guidance to optimize the outputs of the Sensory and Difference Detection nodes.

### Training Pipeline
A staged curriculum that incrementally builds capabilities:

#### Stage 1: Basic Pattern Recognition
*Training the Sensory Node on fundamental visual elements*
- Processes single black shapes on white backgrounds:
  - Points, lines, triangles, rectangles/squares
  - Circles/ellipses, arcs, quadrilaterals
- Focuses on accurate shape classification and description

#### Stage 2: Spatial Understanding
*Developing position and scale awareness*
- Handles varying spatial configurations:
  - Single shapes at different positions
  - Single shapes at different scales
  - Multiple instances of identical shapes
  - Combinations of different shapes
- Trains Difference Detection Node on spatial relationships

#### Stage 3: Color Processing
*Introducing color perception and relationships*
- Progresses through color complexity:
  - Single color fills
  - Multiple fill colors
  - Stroke properties and colors
  - Color blending and transparency
  - Background color variations
- Develops color-aware natural language descriptions

#### Stage 4: 2D Transformations
*Learning geometric operations*
- Masters common transformations:
  - Translation and rotation
  - Uniform and non-uniform scaling
  - Shearing operations
  - Matrix-based transformations
- Strengthens transformation detection capabilities

#### Stage 5: Advanced 2D Features
*Handling complex 2D operations*
- Implements sophisticated 2D techniques:
  - Clipping mask operations
  - Erasure and subtraction
  - Custom shape generation
  - Pattern synthesis
  - Controlled randomness

#### Stage 6: Basic 3D Understanding
*Transitioning to 3D geometry*
- Recognizes fundamental 3D primitives:
  - Boxes and spheres
  - Cylinders and cones
  - Planes and toruses
  - Ellipsoids
- Develops 3D spatial reasoning

#### Stage 7: 3D Lighting and Materials
*Mastering illumination and surface properties*
- Processes lighting configurations:
  - Ambient illumination
  - Directional light sources
  - Point and spot lighting
  - Material properties
  - Texture mapping
  - Surface reflectance models

#### Stage 8: Advanced 3D Scene Understanding
*Comprehending complex 3D environments*
- Handles sophisticated viewing scenarios:
  - Camera position optimization
  - Projection system selection
  - Multi-viewpoint analysis
  - Environment mapping
  - Panoramic scene integration

#### Stage 9: Integrated Capabilities
*Combining all learned skills*
- Synthesizes complete scenes:
  - Complex 3D compositions
  - Hybrid 2D/3D environments
  - Dynamic lighting systems
  - Interactive transformation chains
  - Advanced material interactions

Each stage validates progress through the Verification Node, ensuring robust generalization before advancing.

### ARC-AGI 2025

## 4. Program Synthesis Node (Neural Network + Tools)
A transformation module that takes example pairs and generates:
- Natural language description of the transformation
- Code that transforms input to output
- Reusable transformation primitives

### Key Components

#### 1. Pattern Recognition
- Identifies recurring patterns in example pairs
- Extracts transformation rules and invariants
- Builds library of common operations

#### 2. Program Generation
- Synthesizes code to implement transformations
- Combines primitive operations into programs
- Validates against example pairs
- Refines through iterative testing

#### 3. Abstraction Learning
- Discovers high-level transformation concepts
- Groups related operations into reusable modules
- Builds hierarchical program structure
- Enables transfer to new problems

#### 4. Program Optimization
- Simplifies generated programs
- Removes redundant operations
- Improves efficiency and generalization
- Validates correctness preservation

### Integration with Other Nodes

#### Sensory Node Integration
- Uses perceptual features as program inputs
- Validates visual consistency of outputs
- Provides feedback for program refinement

#### Difference Detection Integration  
- Guides program structure based on changes
- Validates transformation completeness
- Helps identify key operations needed

#### Verification Node Integration
- Tests programs on new examples
- Measures generalization performance
- Guides program improvements

### Advantages
- Combines neural and symbolic approaches
- Produces interpretable solutions
- Enables transfer learning
- Scales to complex transformations

The Program Synthesis Node completes our architecture by bridging perception and action through explicit programs, while maintaining the flexibility of neural approaches.

