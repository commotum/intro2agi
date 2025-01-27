

# MakeMore Exercises

## 1. Read Bengio et al. 2003 Paper
- [ ] Read ["A Neural Probabilistic Language Model"](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf)
- [ ] Take notes on key concepts and innovations
- [ ] Compare their word-level approach to Karpathy's character-level implementation

## 2. Model Optimization Challenge
Goal: Beat validation loss of 2.19 (current best)

### Hyperparameter Experimentation
- [ ] Embedding dimensions
  - [ ] Try values between 10-50
  - [ ] Document impact on performance
- [ ] Hidden layer size
  - [ ] Test various architectures (100-500 neurons)
  - [ ] Look for optimal size/performance trade-off
- [ ] Context length (block size)
  - [ ] Experiment with different context windows
  - [ ] Analyze impact on prediction quality

### Training Optimizations
- [ ] Learning rate tuning
  - [ ] Implement proper learning rate finder
  - [ ] Test different decay schedules
- [ ] Batch size optimization
  - [ ] Try different batch sizes
  - [ ] Balance between training speed and stability
- [ ] Add regularization
  - [ ] Implement dropout
  - [ ] Try L1/L2 regularization
  - [ ] Compare effects on overfitting

### Best Practices Implementation
- [ ] Create proper hyperparameter configuration system
- [ ] Set up systematic experiment tracking
- [ ] Implement proper train/val/test split methodology
- [ ] Document all experiments and results

## Bonus
- [ ] Try to understand why certain configurations work better than others
- [ ] Visualize embeddings for different model sizes
- [ ] Analyze model's failure cases
