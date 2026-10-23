/* Important topics for the Computer Vision (NPTEL / IIT Kharagpur) exam.
   Practice questions for each topic are pulled automatically from QUESTIONS by `tp` id. */
const TOPICS = [
  {
    id: "imgproc", title: "Image basics, Otsu & Histogram Equalization", weeks: "Week 1", stars: 3,
    why: "Numerical questions on Otsu and histogram equalization are very common in the first assignment-style problems.",
    points: [
      "Digital image = matrix of intensities; b bits → 2ᵇ grey levels (0 … 2ᵇ−1).",
      "Histogram h(i) = number of pixels with level i; normalised p(i) = h(i)/N.",
      "Histogram equalization improves CONTRAST: new level = round( CDF(i) · (L−1) / N ).",
      "Otsu thresholding: pick t that MAXIMISES the between-class variance σ²_B = ω₀ω₁(μ₀−μ₁)² (≡ minimises within-class variance). Works best for bimodal histograms.",
      "Bayes' theorem & normal distribution tables appear as supporting maths: P(X<a) = P(z<(a−μ)/σ)."
    ],
    formulas: [
      "z = (X − μ)/σ",
      "ω₀(t) = Σ_{i≤t} p(i),  ω₁ = 1 − ω₀",
      "μ₀(t) = Σ_{i≤t} i·p(i)/ω₀,  μ₁ = (μ_T − ω₀μ₀)/ω₁",
      "σ²_B(t) = ω₀ ω₁ (μ₀ − μ₁)²",
      "Bayes: P(E|A) = P(A|E)P(E) / Σ P(A|Eₖ)P(Eₖ)"
    ],
    tip: "Make a small table (t, ω₀, ω₁, μ₀, μ₁, σ²_B). For equalization: histogram → cumulative → ×(L−1)/N → round."
  },
  {
    id: "filters", title: "Filters, Gradients & Fourier Transform", weeks: "Week 1", stars: 3,
    why: "Recognising kernels (Sobel / Prewitt / Laplacian / Gaussian) and separability is a frequent 1-mark question.",
    points: [
      "Prewitt: weights 1 1 1 / 0 0 0 / −1 −1 −1 (uniform). Sobel: 1 2 1 / 0 0 0 / −1 −2 −1 (centre weighted ×2, adds smoothing).",
      "Gradient / first-derivative operators detect edges; on a filled square only the boundary survives.",
      "Laplacian = second derivative, isotropic; Gaussian & box filters = low-pass; median = non-linear, removes impulse noise.",
      "A kernel is SEPARABLE if rank = 1 (outer product of a column and a row) → two 1-D convolutions are cheaper.",
      "Convolution in space ⇔ multiplication in frequency.",
      "FT of e^(−at)u(t) is 1/(a + jω)."
    ],
    formulas: [
      "Rank-1 kernel: K = u vᵀ",
      "∇f = (∂f/∂x, ∂f/∂y),  |∇f| = √(fₓ² + f_y²),  θ = atan2(f_y, fₓ)",
      "Central difference: fₓ ≈ (f(x+1) − f(x−1))/2",
      "X(jω) = ∫ x(t) e^(−jωt) dt"
    ],
    tip: "Rank test: if every row is a scalar multiple of one row, the kernel is rank-1 and separable."
  },
  {
    id: "homog", title: "Projective Geometry & Homography", weeks: "Week 2", stars: 3,
    why: "Whole Week-2 assignment: point/line/conic transformations, vanishing line, DLT, angle between lines.",
    points: [
      "Homogeneous coordinates: (x,y) ↔ (kx,ky,k). Points with w=0 are points at infinity; l∞ = (0,0,1)ᵀ.",
      "Line through 2 points: l = p₁ × p₂.  Intersection of 2 lines: p = l × m.",
      "Homography H: 3×3, non-singular, 8 DoF → needs 4 point correspondences (DLT: Ah=0, solve by SVD). Preserves collinearity.",
      "Transformation rules: points x′ = Hx; lines l′ = H⁻ᵀ l; conics C′ = H⁻ᵀ C H⁻¹; dual conic C*′ = H C* Hᵀ.",
      "Vanishing line = image of l∞ = H⁻ᵀ(0,0,1)ᵀ.",
      "Circular points I=(1,i,0), J=(1,−i,0) are fixed under similarity transforms. Dual conic at infinity C*∞ = diag(1,1,0).",
      "DoF: Euclidean 3, Similarity 4 (1 scale, 1 rotation, 2 translation), Affine 6, Projective 8.",
      "Circle/conic matrix from ax²+bxy+cy²+dx+ey+f=0:  C = [[a,b/2,d/2],[b/2,c,e/2],[d/2,e/2,f]]."
    ],
    formulas: [
      "x′ = H x",  "l′ = H⁻ᵀ l",  "C*′ = H C*∞ Hᵀ",
      "cos θ = lᵀ C*∞ m / √[(lᵀC*∞ l)(mᵀC*∞ m)]",
      "DLT rows: [0ᵀ, −w′Xᵀ, y′Xᵀ; w′Xᵀ, 0ᵀ, −x′Xᵀ] h = 0"
    ],
    tip: "Always append a 1 to (x,y) before multiplying, and divide by the last coordinate at the end."
  },
  {
    id: "camera", title: "Pinhole Camera & Projection Matrix", weeks: "Week 3, 5", stars: 3,
    why: "Plug-in numerical questions (projection, P = K[R|−RC], camera centre, vanishing point) – easy marks.",
    points: [
      "Perspective projection: (X,Y,Z) → (fX/Z, fY/Z); with principal point add (pₓ, p_y).",
      "Calibration matrix K = [[f,0,pₓ],[0,f,p_y],[0,0,1]] (add fₓ≠f_y and skew in general).",
      "P = K[R | −RC] = K[R | t] with t = −RC. 11 DoF.",
      "Camera centre: C = (−M⁻¹p₄, 1) for P=[M|p₄]; satisfies PC = 0.",
      "Vanishing point of direction d: v = P (d, 0)ᵀ = K R d.",
      "Back-projected ray: X(λ) = P⁺x + λC  (two points: P⁺x and C).",
      "Point at distance s along a ray: X = C + s·d/‖d‖.",
      "Plane through camera centre and two image points: normal = r₁ × r₂."
    ],
    formulas: ["x = f X/Z + pₓ,  y = f Y/Z + p_y", "P = K R [I | −C]", "C = −M⁻¹ p₄", "v = P·(a,b,c,0)ᵀ"],
    tip: "If R = I then P = K[I | −C] and the last column is just K·(−C)."
  },
  {
    id: "epipolar", title: "Epipolar Geometry: F, E, Epipoles", weeks: "Week 4, 5", stars: 3,
    why: "Largest block of calculation questions in Weeks 4–5 – learn the formula list below.",
    points: [
      "Epipolar constraint: x′ᵀ F x = 0. Epipolar line in right image l′ = F x; in left image l = Fᵀ x′.",
      "F is rank 2, 7 DoF; Fe = 0 (e = left epipole), Fᵀe′ = 0 (right epipole).",
      "Epipolar line through epipole and a point: l′ = e′ × x′. All epipolar lines meet at the epipole: e′ = l′₁ × l′₂.",
      "Given K, K′, R, t:  H∞ = K′ R K⁻¹,  e′ = K′ t,  F = [e′]ₓ H.",
      "Given P = [I|0], P′ = [M|m]:  e′ = m,  F = [m]ₓ M.",
      "Essential matrix (calibrated): E = [t]ₓ R and E = K′ᵀ F K. E has rank 2, singular values (σ, σ, 0), 5 DoF.",
      "Pure translation (no rotation, same K): F = [e′]ₓ (skew-symmetric).",
      "Compatibility of F with cameras: P′ᵀ F P must be skew-symmetric."
    ],
    formulas: [
      "[a]ₓ = [[0,−a₃,a₂],[a₃,0,−a₁],[−a₂,a₁,0]]",
      "F = [e′]ₓ H = [e′]ₓ K′ R K⁻¹",
      "E = K′ᵀ F K = [t]ₓ R",
      "H∞ = M′ M⁻¹"
    ],
    tip: "Write the skew-symmetric matrix [v]ₓ carefully – sign mistakes are the most common error."
  },
  {
    id: "stereo", title: "Stereo, Disparity & Depth", weeks: "Week 4, 5", stars: 3,
    why: "Depth-from-disparity numerical questions appear every year with different numbers.",
    points: [
      "Rectified setup: epipolar lines are parallel/horizontal; match along the same row.",
      "Depth Z = f·B / d where d = x′ − x (disparity); nearer objects have larger disparity.",
      "With P = K[I|0], P′ = K[I|t]:  x′ = x + (K t)ₓ / Z.",
      "Pure translation along x ⇒ parallel epipolar lines; F still rank 2 (never full rank)."
    ],
    formulas: ["Z = fB/d", "x′ = x + (Kt)ₓ/Z  ⇒  Z = (Kt)ₓ / (x′ − x)"],
    tip: "Check units: (Kt)ₓ = f·B. Z = that ÷ disparity."
  },
  {
    id: "features", title: "Edges, Corners, LBP, SIFT & SURF", weeks: "Week 6", stars: 3,
    why: "Mix of conceptual MSQs (SIFT vs SURF, corner vs edge) and small calculations (LBP, gradient, SIFT scale).",
    points: [
      "Corner: both principal curvatures / eigenvalues of the structure matrix are HIGH. Edge: one high, one low. Flat: both low.",
      "Harris response R = det(M) − k·trace(M)².",
      "SIFT: scale-space (Gaussian octaves) → DoG extrema (26 neighbours) → keypoint refinement → orientation (36-bin histogram) → 128-D descriptor (4×4×8).",
      "Scale factor within octave: k = 2^(1/s) when an octave has s+1 images (s intervals).",
      "SURF: box filters (Hessian) approximating Gaussians, integral images for speed, Haar wavelet responses for orientation/descriptor (64-D).",
      "LBP: compare 8 neighbours with the centre (≥ centre → 1), multiply by weights 2⁰…2⁷ and sum; robust to monotonic illumination change.",
      "Gradient by central difference: Iₓ = (I(x+1)−I(x−1))/2."
    ],
    formulas: ["k = 2^(1/s)", "LBP = Σ s(g_p − g_c)·2^p", "R = det M − k (tr M)²"],
    tip: "For LBP read the weight table exactly as printed in the question – the first neighbour is defined there."
  },
  {
    id: "matching", title: "Feature Matching: Distances, NNDR, KD-Tree, KL", weeks: "Week 6, 7", stars: 2,
    why: "Short calculations: L1/L2, NCC, cosine, KL divergence and KD-tree insertion.",
    points: [
      "L1 = Σ|fᵢ−gᵢ|, L2 = √Σ(fᵢ−gᵢ)².",
      "Cosine similarity = f·g/(‖f‖‖g‖); NCC = correlation of MEAN-SUBTRACTED vectors (cov/(σfσg)).",
      "NNDR (ratio test): accept if d₁/d₂ < threshold (small ratio = distinctive match).",
      "KL divergence D_KL(P‖Q)=Σp ln(p/q): ≥ 0, not symmetric; compares distributions.",
      "KD-tree: binary tree; split axis alternates (x,y,x,…). Insert by comparing with the node on its axis: smaller → left, larger → right. Average NN search O(log N)."
    ],
    formulas: ["cos = f·g/(‖f‖‖g‖)", "NCC = Σ(f−f̄)(g−ḡ)/(‖f−f̄‖‖g−ḡ‖)", "D_KL = Σ p ln(p/q)"],
    tip: "In KD-tree questions draw the tree after each insertion."
  },
  {
    id: "fitting", title: "Model Fitting: Least Squares, Hough, RANSAC", weeks: "Week 6, 7", stars: 3,
    why: "Direct formulas: normal equations, Hough parameter-space lines, RANSAC iteration count.",
    points: [
      "Least squares line y=ax+b: solve a·Σx² + b·Σx = Σxy and a·Σx + n·b = Σy.",
      "Shifting all y by c shifts the intercept by c; slope unchanged.",
      "Hough (slope-intercept): point (x,y) → line c = −mx + y in (m,c) space. Polar form: ρ = x cosθ + y sinθ. Good with many lines; accumulator peaks = lines.",
      "RANSAC: repeat minimal-sample fits, keep the model with most inliers; robust to outliers. Needs N = ln(1−p)/ln(1−(1−e)ˢ) trials.",
      "Minimal sample sizes: line 2, homography 4, fundamental matrix 7/8, plane (3D) 3.",
      "Model-fitting examples: affine/homography estimation, plane in point cloud, circle in edge points."
    ],
    formulas: ["N = ln(1−p) / ln(1 − (1−e)ˢ)", "c = −m x + y"],
    tip: "For RANSAC compute the number with a calculator and round to the nearest integer (as the course key does)."
  },
  {
    id: "color", title: "Colour Spaces & Demosaicing", weeks: "Week 8", stars: 3,
    why: "Week 8 is calculation-heavy: HSI saturation, CMY, Bayer interpolation, diagonal colour correction, chromaticity.",
    points: [
      "CMY = 255 − RGB. HSI: I = (R+G+B)/3, S = 1 − min(R,G,B)/I.",
      "Bayer CFA: 50 % green, 25 % red, 25 % blue; demosaicing interpolates missing channels and tends to blur edges.",
      "Green is least aliased and carries most detail; R, G, B are strongly correlated (similar edges).",
      "Bilinear interpolation: average the neighbours of the same colour (e.g. G at a B pixel = mean of 4 neighbouring G).",
      "Edge-directed (Laplacian-corrected): compare horizontal vs vertical gradients ΔH, ΔV and interpolate along the smaller one with a Laplacian correction term.",
      "Hue-based interpolation uses colour RATIOS (B/G) rather than differences.",
      "Diagonal colour correction: k_c = target_c / source_c for each channel.",
      "Luminance Y gets more bits/bandwidth than chrominance (I, Q); chroma can be sub-sampled.",
      "Maximally saturated colour: intersect line (white → q) with the gamut triangle edge in x–y chromaticity space (use cross products)."
    ],
    formulas: ["G₅ = (G₄+G₆)/2 + (2B₅ − B₃ − B₇)/4  (if ΔH < ΔV)", "ΔH = |G₄−G₆| + |2B₅−B₃−B₇|", "S = 1 − min(R,G,B)/I"],
    tip: "Identify the pixel's colour in the Bayer grid first (R/G/B) – then list its same-coloured neighbours."
  },
  {
    id: "range", title: "Range Images, Structured Light & Surface Geometry", weeks: "Week 6, 9", stars: 3,
    why: "Differential-geometry formulas (E,F,G, H, K, normal, tangent) are easy marks if you remember them.",
    points: [
      "Structured light: project coded patterns, triangulate. n binary patterns encode 2ⁿ stripes. Gray code: g = n XOR (n>>1) – neighbours differ by 1 bit.",
      "Kinect v1: IR laser speckle pattern + IR camera (structured-light triangulation); far points appear more defocused.",
      "Parametric curve tangent = (x′(t), y′(t)).",
      "Parametric surface X(u,v): X_u, X_v are tangent vectors; normal ∝ X_u × X_v.",
      "First fundamental form: E = X_u·X_u, F = X_u·X_v, G = X_v·X_v; ds² = E du² + 2F du dv + G dv².",
      "Second fundamental form coefficients e, f, g. Mean curvature H = (Eg + Ge − 2Ff)/(2(EG − F²)); Gaussian K = (eg − f²)/(EG − F²) = κ₁κ₂.",
      "K>0 elliptic (peak/pit), K<0 hyperbolic (saddle), K=0 parabolic (ridge/valley/flat).",
      "Range-image edges: STEP edge = depth jump; ROOF edge = surface-orientation change, found as extremum of the dominant principal curvature."
    ],
    formulas: ["H = (E g + G e − 2F f) / (2(EG − F²))", "K = κ₁κ₂ = (eg − f²)/(EG − F²)", "n ∝ S_u × S_v"],
    tip: "Differentiate first, substitute the (u,v) point afterwards."
  },
  {
    id: "classify", title: "KNN, K-means, Naive Bayes, Cosine Classifier", weeks: "Week 10", stars: 3,
    why: "Small hand computations (distances, majority vote, centroid update) – quick marks.",
    points: [
      "KNN: compute distances to all training points, take the K nearest, majority vote. Larger K → smoother boundary.",
      "K-means: (1) assign each point to nearest centroid, (2) recompute centroid = mean of members, repeat. Converges to local minimum; depends on initial centroids.",
      "Bayes decision: choose class with larger P(x|C)·P(C). If prior of class 1 is larger, the boundary shifts INTO region R2 (R1 grows).",
      "Naive Bayes: features conditionally independent given the class.",
      "Cosine-similarity prototype classifier: assign the class whose prototype vector has the largest cosine similarity with the query."
    ],
    formulas: ["d = √Σ(aᵢ−bᵢ)²", "centroid = (1/|C|) Σ x", "cos = a·b/(‖a‖‖b‖)"],
    tip: "Do not forget the tie / ordering: pick the K smallest distances, not the K smallest coordinates."
  },
  {
    id: "nn", title: "Neural Networks (MLP) & Counting Parameters", weeks: "Week 10", stars: 2,
    why: "Forward pass with ReLU, squared error, and parameter counting.",
    points: [
      "Single neuron + signum/step = linear classifier (AND/OR yes, XOR no). Sigmoid neuron models the posterior P(C|x).",
      "Forward pass: h = ReLU(Wx), o = ReLU(W′h). Error E = ½Σ(target − output)².",
      "Parameters of one hidden layer net = (d_in + 1)·h + (h + 1)·d_out (weights + biases).",
      "ReLU(x) = max(0,x); sigmoid ∈ (0,1); softmax outputs sum to 1; training uses backpropagation (chain rule) + gradient descent.",
      "Overfitting remedies: dropout, weight decay, data augmentation, early stopping."
    ],
    formulas: ["params = (d_in+1)h + (h+1)d_out", "E = ½ Σ (t − o)²", "softmax(zᵢ) = e^{zᵢ}/Σ e^{zⱼ}"],
    tip: "Identify which weights feed which neuron before computing – the question's figure defines the wiring."
  },
  {
    id: "dimred", title: "PCA, LDA, Covariance & Eigenvalues", weeks: "Week 6, 11", stars: 3,
    why: "Conceptual MSQs (true/false on PCA) plus covariance, eigenvalue, Fisher direction calculations.",
    points: [
      "PCA: UNSUPERVISED; components = eigenvectors of the covariance matrix; first PC = direction of maximum variance; minimises least-squares reconstruction error.",
      "Steps: centre data → covariance Σ = XcᵀXc/n (or n−1) → eigen-decomposition → keep top-k eigenvectors.",
      "Variance retained by k components = (λ₁+…+λₖ)/Σλ.",
      "Number of PCs ≤ min(d, n−1) – NOT equal to number of data points.",
      "Fisher LDA: SUPERVISED; maximise between-class scatter / within-class scatter; two-class direction w = S_W⁻¹(μ₁ − μ₂); ≤ C−1 directions.",
      "Within-class scatter S_W = Σ_classes Σ (x−μ_c)(x−μ_c)ᵀ.",
      "Eigenvalues of 2×2 [[a,b],[c,d]]: roots of λ² − (a+d)λ + (ad−bc) = 0; complex if discriminant < 0."
    ],
    formulas: ["Σ = XcᵀXc / n", "w = S_W⁻¹ (μ₁ − μ₂)", "J(w) = wᵀS_B w / wᵀS_W w", "projection = μ·w"],
    tip: "For a 2×2 covariance with equal entries [[a,a],[a,a]] the eigenvalues are 2a and 0, eigenvector (1,1)/√2."
  },
  {
    id: "sparse", title: "Sparse Representation, OMP & K-SVD", weeks: "Week 11", stars: 2,
    why: "Concept MSQs on dictionaries / K-SVD plus one OMP calculation.",
    points: [
      "Sparse coding: y ≈ Dx with few non-zero entries in x. Over-complete dictionary: more atoms than signal dimension.",
      "ℓ₀ (count of non-zeros) is NP-hard → Basis Pursuit uses ℓ₁ (convex) ; OMP is a GREEDY method.",
      "OMP: pick the atom most correlated with the residual, solve least squares on the chosen atoms, update the residual, repeat k times.",
      "K-SVD: alternate (1) sparse coding with OMP and (2) dictionary update: for each atom compute the error matrix E_j without atom j and take the rank-1 SVD → new atom = first left singular vector.",
      "K-SVD generalises K-means: K-means = sparsity 1 (one centroid per point)."
    ],
    formulas: ["min ‖x‖₀ s.t. y = Dx", "BP: min ‖x‖₁ s.t. y = Dx", "E_j = X − Σ_{i≠j} dᵢ yᵢᵀ ≈ σ₁u₁v₁ᵀ"],
    tip: "In OMP, after choosing atoms re-fit ALL selected coefficients by least squares (that is the 'orthogonal' part)."
  },
  {
    id: "cnn", title: "CNN Basics: Conv, Pooling, BN, Losses", weeks: "Week 12", stars: 3,
    why: "Output-size and parameter-count formulas are asked every time; plus cross-entropy and label smoothing.",
    points: [
      "Output size = ⌊(W − K + 2P)/S⌋ + 1; depth = number of kernels.",
      "Conv layer parameters = (K·K·C_in + 1)·N_filters (weights + 1 bias per filter). Pooling layers have 0 parameters.",
      "Pooling: reduces spatial size, gives small translation invariance, keeps dominant responses (max / average).",
      "Batch normalisation: normalises activations over the mini-batch → stabler training, allows higher learning rates.",
      "Cross-entropy: L = −Σ yᵢ log pᵢ (= −log of the true-class probability for one-hot labels).",
      "Label smoothing: y_smooth = (1−α)y + α/K.",
      "Up-convolution (transposed conv): every input value scales a copy of the filter; overlaps are summed.",
      "Dropout, data augmentation, weight decay reduce over-fitting; ReLU avoids vanishing gradients."
    ],
    formulas: ["out = ⌊(W−K+2P)/S⌋ + 1", "params = (K·K·C_in + 1)·N", "L = −log p_true", "y_smooth = (1−α)y + α/K"],
    tip: "Do width and height separately when the image is not square (27×21 in the assignment)."
  },
  {
    id: "detect", title: "Object Detection: R-CNN family", weeks: "Week 12", stars: 2,
    why: "True/false on R-CNN, Fast R-CNN, Faster R-CNN and a small timing computation.",
    points: [
      "R-CNN: selective-search proposals; the CNN is run SEPARATELY on every proposal (slow).",
      "Fast R-CNN: CNN once on the whole image, RoI pooling extracts a fixed-size feature per proposal; proposals still from selective search.",
      "Faster R-CNN: Region Proposal Network (RPN) on the shared conv feature map produces proposals → near real-time.",
      "Faster R-CNN time = conv time + (#proposals × FC time) (as used in the assignment).",
      "IoU = intersection area / union area; non-maximum suppression removes duplicate boxes."
    ],
    formulas: ["IoU = |A∩B| / |A∪B|", "T_FasterRCNN = T_conv + N_prop × T_fc"],
    tip: "Remember the evolution: R-CNN → (share the conv) Fast → (learn proposals with RPN) Faster."
  }
];
