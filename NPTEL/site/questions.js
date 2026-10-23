/* Question bank.
   Q(id, week, type, level(1-3), topic, text, options, answer, solution, extra)
   type: MCQ | MSQ | NUM     answer: index (MCQ) | [indices] (MSQ) | number (NUM)
   Matrices inside text are written {{a b c | d e f | g h i}}  (rows separated by |)
   Questions with extra.x === true are additional practice questions written for revision
   (they are NOT from the official NPTEL assignments). */
const QUESTIONS = [];
function Q(id, w, t, d, tp, q, o, a, s, extra) {
  QUESTIONS.push(Object.assign({ id, w, t, d, tp, q, o, a, s }, extra || {}));
}

/* ======================= WEEK 1 : Fundamentals of image processing ======================= */
Q("w1q1", 1, "MCQ", 1, "imgproc",
  "The probability of a normal variable P(z > 1.8) = 0.0359. A random variable X is normally distributed with mean μ = 50 and standard deviation σ = 10. Compute P(X < 68).",
  ["0.9641", "0.0359", "0.1800", "0.8200"], 0,
  "z = (X − μ)/σ = (68 − 50)/10 = 1.8.\nP(X < 68) = P(z < 1.8) = 1 − P(z > 1.8) = 1 − 0.0359 = 0.9641.");

Q("w1q2", 1, "MCQ", 3, "imgproc",
  "Consider the following 3-bit grayscale image:\n{{0 1 2 3 | 3 4 5 6 | 0 1 2 4 | 5 2 4 6}}\nWhat is the optimal threshold according to the Otsu method?",
  ["1", "4", "5", "2"], 3,
  "Histogram h(i) for gray levels 0..6 = 2, 2, 3, 2, 3, 2, 2 (N = 16).\nFor every threshold t compute class probabilities ω0, ω1, class means μ0, μ1 and the between-class variance σ²_B = ω0·ω1·(μ0 − μ1)².\n\nt : σ²_B\n0 : 1.39\n1 : 2.30\n2 : 3.06  ← maximum\n3 : 2.91\n4 : 1.88\n5 : 1.18\nMaximum between-class variance occurs at t = 2.");

Q("w1q3", 1, "MCQ", 2, "imgproc",
  "Consider two images each of size 40×40, I₁ and I₂. Image I₁ has 900 foreground pixels and 700 background pixels. Image I₂ has 600 foreground and 1000 background pixels. One pixel is selected at random from one of the two images and it is found to be a background pixel. Find the probability that it was drawn from image I₁.",
  ["17/7", "10/17", "7/10", "7/17"], 3,
  "Bayes' theorem. P(E₁) = P(E₂) = 0.5, P(A|E₁) = 700/1600, P(A|E₂) = 1000/1600.\nP(E₁|A) = (700/1600·½) / (700/1600·½ + 1000/1600·½) = 700/1700 = 7/17.");

Q("w1q4", 1, "MCQ", 1, "filters",
  "Consider the image patch:\n{{3 3 3 | 0 0 0 | -3 -3 -3}}\nWhich operator is most closely represented?",
  ["Median filter", "Histogram equalization", "Prewitt operator", "Gaussian smoothing"], 2,
  "Prewitt masks use uniform weights (all 1s / −1s) to estimate gradients and detect edges in a specific direction.");

Q("w1q5", 1, "MCQ", 1, "filters",
  "Consider the image patch:\n{{1 2 1 | 0 0 0 | -1 -2 -1}}\nWhich kernel does it correspond to?",
  ["Averaging filter", "Sobel operator", "Laplacian operator", "Median filter"], 1,
  "This is the Sobel mask – like Prewitt but the centre row gets weight 2 (smoothing + differentiation). It responds to intensity changes along the y-direction.");

Q("w1q6", 1, "MCQ", 1, "imgproc",
  "Which of the following is the primary purpose of histogram equalization?",
  ["Reduce image size", "Improve image contrast", "Remove image noise", "Detect edges"], 1,
  "Histogram equalization redistributes the intensity values over the whole available range to enhance contrast, especially in low-contrast images.");

Q("w1q7", 1, "MCQ", 3, "imgproc",
  "Consider the following 4×4 image array (the asterisk marks location (2,2), whose value is 4):\n{{0 1 2 4 | 2 3 4 5 | 1 2 4* 6 | 0 3 5 6}}\nWhat is the value after histogram equalization at the location (2,2) shown with the asterisk?",
  ["3", "4", "5", "6"], 2,
  "Image is 3-bit (L = 8 levels), N = 16 pixels.\nNew value = round( CDF(i) × (L−1)/N ) = round( CDF × 7/16 ).\n\nPixel : freq : cumulative : cum×7/16 : new\n0 : 2 : 2 : 0.875 : 1\n1 : 2 : 4 : 1.75 : 2\n2 : 3 : 7 : 3.06 : 3\n3 : 2 : 9 : 3.94 : 4\n4 : 3 : 12 : 5.25 : 5\n5 : 2 : 14 : 6.13 : 6\n6 : 2 : 16 : 7.00 : 7\nThe marked pixel is 4 → maps to 5.");

Q("w1q8", 1, "MCQ", 2, "filters",
  "Consider the following kernel:\nK = {{2 4 6 | 1 2 3 | -4 -8 -12}}\nWhat is the rank of this matrix, and is it separable?",
  ["Rank = 1, separable", "Rank = 2, separable", "Rank = 2, not separable", "Rank = 3, not separable"], 0,
  "R1 = 2·R2 and R3 = −4·R2, so only one independent row exists → rank 1.\nA rank-1 kernel can be written as an outer product of a column and a row vector, so it is separable (K = [2 1 −4]ᵀ · [1 2 3]).");

Q("w1q9", 1, "MCQ", 1, "filters",
  "Consider a binary image with a fully filled white square at the centre on a black background. How does this image look after applying an image gradient operation?",
  ["Entire square remains white", "A thin line surrounding the square boundary", "Only the centre pixel becomes white", "Entire background becomes white"], 1,
  "The gradient highlights intensity transitions only at object boundaries. Inside the square (and outside) intensity is constant, so only the edges survive.");

Q("w1q10", 1, "MCQ", 2, "filters",
  "Find the Fourier Transform of the time signal x(t) = e^(−3t) u(t).",
  ["1/(3 + jω)", "1/(2 + jω)", "1/(1 + jω)", "1/(4 + jω)"], 0,
  "X(jω) = ∫₀^∞ e^(−3t) e^(−jωt) dt = ∫₀^∞ e^(−(3+jω)t) dt = 1/(3 + jω).\n(General: e^(−at)u(t)  ⇄  1/(a + jω).)");

/* ======================= WEEK 2 : Projective geometry ======================= */
Q("w2q1", 2, "MCQ", 1, "homog",
  "A possible equivalent representation of a 2D point (1/2, 3/4) in R² after projecting onto P² is",
  ["(2, 3, 1)", "(3, 2, 4)", "(4, 6, 8)", "(6, 4, 3)"], 2,
  "A point (x, y) is represented in P² by the vectors (kx, ky, k)ᵀ for any k ≠ 0.\nWith k = 8: (4, 6, 8). Inhomogeneous again: (4/8, 6/8) = (1/2, 3/4).");

Q("w2q2", 2, "MCQ", 2, "homog",
  "Given a homography H = {{2 1 0 | 1 0 1 | 1 2 -1}}. Find the transformation of the point (5, 3).",
  ["(6, −13, −10)", "(13, −6, 10)", "(13, 6, 10)", "(13, −6, 11)"], 2,
  "x′ = H x with x = (5, 3, 1)ᵀ:\nrow1: 2·5 + 1·3 + 0 = 13\nrow2: 1·5 + 0 + 1 = 6\nrow3: 1·5 + 2·3 − 1 = 10\n→ (13, 6, 10).");

Q("w2q3", 2, "MCQ", 3, "homog",
  "Given the same homography H = {{2 1 0 | 1 0 1 | 1 2 -1}}. Find the transformation of the line passing through the points p₁ = (2, 0) and p₂ = (1, −3).",
  ["11.5x + 10y − 5.5 = 0", "10x − 11.5y + 5.5 = 0", "10x − y + 5.5 = 0", "10x − 11.5y − 5.5 = 0"], 3,
  "Line through two points: l = p₁ × p₂ = (2,0,1) × (1,−3,1) = (3, −1, −6).\nLines transform as l′ = H⁻ᵀ l.\nComputing H⁻ᵀ l gives (10, −11.5, −5.5) → 10x − 11.5y − 5.5 = 0.");

Q("w2q4", 2, "MSQ", 1, "homog",
  "Which of the following properties are true for a homography?",
  ["It transforms a point in real R² space to projective P² space.",
   "Three points lie on the same line if and only if their homographic transforms lie on the same line.",
   "A minimum of 4 point correspondences is needed to compute a homography.",
   "It is only in the form of a singular 3×3 matrix."], [1, 2],
  "A homography is a projective transformation P² → P² (not R² → P²), it preserves collinearity, has 8 DoF (so 4 point correspondences × 2 equations each are enough) and must be a NON-singular (invertible) 3×3 matrix.");

Q("w2q5", 2, "MCQ", 3, "homog",
  "Given a homography H = {{1 1 0 | 1 0 1 | 0 1 1}}, compute the transformation of the dual conic C*∞ (= I·Jᵀ + J·Iᵀ) under H, where I = (1, i, 0)ᵀ and J = (1, −i, 0)ᵀ.",
  ["{{1 1 1 | 1 1 0 | 1 0 1}}", "{{2 1 1 | 1 0 0 | 1 0 1}}", "{{2 1 1 | 1 1 0 | 1 0 1}}", "{{2 1 1 | 1 2 0 | 1 1 1}}"], 2,
  "I Jᵀ + J Iᵀ = diag(2, 2, 0), i.e. (up to scale) C*∞ = diag(1, 1, 0).\nUnder H the dual conic transforms as C*′ = H C*∞ Hᵀ.\nH diag(1,1,0) Hᵀ = {{2 1 1 | 1 1 0 | 1 0 1}}.");

Q("w2q6", 2, "MCQ", 3, "homog",
  "Given a homography H = {{1 1 -2 | 2 0 1 | 0 2 -1}}. Find the vanishing line.",
  ["(−0.5, 1, 0.25)", "(−0.5, 1.25, 0.25)", "(−0.5, 0.25, 0.25)", "(0, 0, 1)"], 2,
  "The vanishing line is the image of the line at infinity l∞ = (0, 0, 1)ᵀ.\nLines transform as l′ = H⁻ᵀ l∞ → (−0.5, 0.25, 0.25).");

Q("w2q7", 2, "MSQ", 2, "homog",
  "Which of the following statements are true?",
  ["The degree of freedom for the similarity group is 4 (1 scale, 2 rotation, 1 translation).",
   "The circular points are fixed points under the projective transformation H if and only if H is a similarity.",
   "A conic remains a conic under a homography.",
   "Any square matrix can be decomposed as a product of an orthogonal matrix and an upper triangular matrix."], [1, 2, 3],
  "(a) is false: similarity has 4 DoF = 1 scale + 1 rotation + 2 translation.\n(b) true – circular points are fixed exactly under similarities.\n(c) true – conics map to conics.\n(d) true – QR decomposition.");

Q("w2q8", 2, "NUM", 2, "homog",
  "Given two lines l = 2x + y − 3 = 0 and m = 3x − 2y + 1 = 0 meeting at a point p. Find the Euclidean angle between the two lines. Answer in nearest degrees; discard the decimal values.",
  null, 60,
  "cos θ = (lᵀ C*∞ m) / √[(lᵀ C*∞ l)(mᵀ C*∞ m)] with C*∞ = diag(1,1,0).\nl = (2,1,−3), m = (3,−2,1):\nnumerator = 2·3 + 1·(−2) = 4; denominator = √5 · √13 = 8.06\ncos θ = 0.496 → θ ≈ 60.2° → 60.", { tol: 0.5 });

Q("w2q9", 2, "MCQ", 3, "homog",
  "Recollect the Direct Linear Transform (DLT) algorithm for the homogeneous equation A h = 0. Choose the equation from which the matrix A is formed relating a point Xᵢ and its transformed point X′ᵢ in 2D projective spaces, where X′ᵢ = (x′ᵢ, y′ᵢ, w′ᵢ)ᵀ and Xᵢ = (xᵢ, yᵢ, wᵢ)ᵀ.",
  ["{{0ᵀ −w′Xᵀ y′Xᵀ | w′Xᵀ 0ᵀ −x′Xᵀ | −y′Xᵀ x′Xᵀ 0ᵀ}} [h₁ h₂ h₃]ᵀ = 0",
   "{{y′Xᵀ 0ᵀ −w′Xᵀ | w′Xᵀ 0ᵀ −x′Xᵀ | −y′Xᵀ 0ᵀ x′Xᵀ}} [h₁ h₂ h₃]ᵀ = 0",
   "{{0ᵀ −w′Xᵀ w′Xᵀ | x′Xᵀ 0ᵀ −x′Xᵀ | −y′Xᵀ y′Xᵀ 0ᵀ}} [h₁ h₂ h₃]ᵀ = 0",
   "{{0ᵀ 0ᵀ w′Xᵀ | x′Xᵀ 0ᵀ −x′Xᵀ | −y′Xᵀ y′Xᵀ 0ᵀ}} [h₁ h₂ h₃]ᵀ = 0"], 0,
  "From x′ × Hx = 0 we get the (rank-2) system\n{{0ᵀ −w′Xᵀ y′Xᵀ | w′Xᵀ 0ᵀ −x′Xᵀ | −y′Xᵀ x′Xᵀ 0ᵀ}} · [h₁ h₂ h₃]ᵀ = 0.\nOnly 2 of the 3 rows are linearly independent, so each correspondence gives 2 equations; 4 correspondences give an 8×9 matrix A and h = null-vector (via SVD).");

Q("w2q10", 2, "MCQ", 3, "homog",
  "Given a circle of radius 4 with centre at (−3, 2) in R² and homography H = {{1 1 0 | 1 0 1 | 0 1 1}}. Which of the following represents the circle by a conic C?",
  ["{{1 0 3 | 0 1 -2 | 3 -2 -3}}", "{{1 0 3 | 0 1 -2 | 3 -2 3}}", "{{-1 0 -3 | 0 1 2 | 3 2 3}}", "{{1 0 3 | 0 -1 -2 | -3 -2 -3}}"], 0,
  "(x + 3)² + (y − 2)² = 16  →  x² + y² + 6x − 4y − 3 = 0.\nSo a = 1, b = 0, c = 1, d = 6, e = −4, f = −3.\nConic matrix C = {{a b/2 d/2 | b/2 c e/2 | d/2 e/2 f}} = {{1 0 3 | 0 1 -2 | 3 -2 -3}}.");

/* ======================= WEEK 3 : Single view camera geometry ======================= */
Q("w3q1", 3, "MCQ", 1, "camera",
  "A camera centre is at the origin and the image plane is parallel to the XY-plane at distance f = 0.8. The perspective projection of the world point (2, 4, 5) is:",
  ["(8/25, 16/25)", "(2/5, 4/5)", "(5/8, 5/4)", "(4/5, 8/5)"], 0,
  "(x, y) = (fX/Z, fY/Z) = (0.8·2/5, 0.8·4/5) = (8/25, 16/25).");

Q("w3q2", 3, "MCQ", 1, "camera",
  "If the principal point is (1, 2), what are the image coordinates of the world point (4, 6, 8) for a pinhole camera with f = 1?",
  ["(1.25, 2.5)", "(2, 2.5)", "(1.5, 2.75)", "(1.75, 2.75)"], 2,
  "x = fX/Z + pₓ = 4/8 + 1 = 1.5;  y = fY/Z + p_y = 6/8 + 2 = 2.75.");

Q("w3q3", 3, "MCQ", 3, "camera",
  "Given P = K[R | −RC] where f = 2, principal point (1, 3), R = I and camera centre C = (2, 1, 1), find the projection matrix.",
  ["{{2 0 1 -4 | 0 2 3 -6 | 0 0 1 -1}}", "{{2 0 1 -6 | 0 2 3 -8 | 0 0 1 -1}}", "{{2 0 1 -5 | 0 2 3 -5 | 0 0 1 -1}}", "{{2 0 1 -3 | 0 2 3 -5 | 0 0 1 -1}}"], 2,
  "K = {{2 0 1 | 0 2 3 | 0 0 1}}, R = I so P = K[I | −C].\nK(−C) = K·(−2, −1, −1)ᵀ = (−4 −1, −2 −3, −1) = (−5, −5, −1)ᵀ.\nP = {{2 0 1 -5 | 0 2 3 -5 | 0 0 1 -1}}.");

Q("w3q4", 3, "MCQ", 3, "camera",
  "For the projection matrix P = {{1 0 2 -4 | 0 1 1 -2 | 0 0 1 -1}}, find the camera centre in homogeneous coordinates.",
  ["(4, 2, 1, 1)", "(2, 1, 1, 1)", "(1, 1, 1, 1)", "(2, 2, 1, 1)"], 1,
  "P = [M | p₄]. The camera centre is C = (−M⁻¹ p₄, 1).\nM⁻¹ = {{1 0 -2 | 0 1 -1 | 0 0 1}}, p₄ = (−4, −2, −1)ᵀ → M⁻¹p₄ = (−2, −1, −1)ᵀ.\nC = (2, 1, 1, 1). (Check: P·C = 0.)");

Q("w3q5", 3, "MCQ", 3, "camera",
  "If the principal point (pₓ, p_y), focal length f, orientation R and camera centre C of a pinhole camera are (2, 1), 1, R = {{1 0 0 | 0 0.8 0.6 | 0 -0.6 0.8}} and (1, 2, 3) respectively, compute the 3×4 projection matrix P.",
  ["{{1 -1.2 1.6 -3.4 | 0 0.2 1.4 -4.6 | 0 -0.6 0.8 -1.2}}", "{{1 -1.2 1.6 -2.4 | 0 0.2 1.4 -3.6 | 0 -0.6 0.8 -1.2}}", "{{1 -1.2 1.6 -3.4 | 0 0.2 1.4 -3.6 | 0 -0.6 0.8 -2.4}}", "{{1 -1.2 1.6 -1.4 | 0 0.2 1.4 -4.6 | 0 -0.6 0.8 -1.2}}"], 0,
  "P = K R [I | −C] with K = {{1 0 2 | 0 1 1 | 0 0 1}}.\nKR = {{1 -1.2 1.6 | 0 0.2 1.4 | 0 -0.6 0.8}}.\nLast column = KR·(−C) = KR·(−1, −2, −3)ᵀ = (−3.4, −4.6, −1.2)ᵀ.");

Q("w3q6", 3, "MCQ", 2, "camera",
  "Given the projection matrix P = {{1 0 1 0 | 0 2 1 0 | 0 0 1 0}}, find the vanishing point of a line with direction ratio 2 : 3 : 4.",
  ["(1.5, 2.5)", "(1, 2)", "(2, 3)", "(0.25, 0.75)"], 0,
  "Vanishing point v = P·(a, b, c, 0)ᵀ for direction d = (a,b,c) = (2,3,4).\nv = (2 + 4, 6 + 4, 4)ᵀ = (6, 10, 4)ᵀ → (6/4, 10/4) = (1.5, 2.5).");

Q("w3q7", 3, "MCQ", 2, "camera",
  "For a camera centre C = (1, 2, 3) and direction vector (2, 1, 2), find the scene point at distance 6 units from the centre along that ray.",
  ["(2, 3, 4)", "(3, 3, 5)", "(4, 3, 6)", "(5, 4, 7)"], 3,
  "|d| = √(4 + 1 + 4) = 3, unit direction = (2,1,2)/3.\nX = C + 6·(2,1,2)/3 = (1,2,3) + (4,2,4) = (5, 4, 7).");

Q("w3q8", 3, "MCQ", 3, "camera",
  "Given two image points x₁ = (1, 0), x₂ = (2, 2) and camera centre O at the origin, find the unit normal to the plane O x₁ x₂.",
  ["(−2/3, 1/3, 2/3)", "(2/3, −1/3, 2/3)", "(−1/3, 2/3, 2/3)", "(1/3, 1/3, 1/3)"], 0,
  "Rays: r₁ = (1, 0, 1), r₂ = (2, 2, 1).\nn = r₁ × r₂ = (0·1 − 1·2, −(1·1 − 1·2), 1·2 − 0·2) = (−2, 1, 2).\n|n| = 3 → unit normal = (−2/3, 1/3, 2/3).");

Q("w3q9", 3, "MCQ", 1, "camera",
  "For a camera with f = 1, principal point (2, 1), and world point (5, 3, 5), what is the image point?",
  ["(3, 9/5)", "(3, 8/5)", "(7/5, 8/5)", "(8/5, 3)"], 1,
  "x = fX/Z + pₓ = 5/5 + 2 = 3;  y = fY/Z + p_y = 3/5 + 1 = 8/5.");

Q("w3q10", 3, "MSQ", 2, "camera",
  "Consider a pinhole camera with camera centre at the origin and image plane Z = f. A 3D point X = (2, 4, 2) is projected onto the image plane with f = 1. Which statements are correct?",
  ["The image point is (2, 4).",
   "The projected point lies on the ray passing through the camera centre and the 3D point.",
   "If the focal length is doubled, the image point also doubles in magnitude.",
   "The projection preserves straight lines in 3D not passing through the camera centre as straight lines in the image."], [1, 2, 3],
  "(x, y) = (fX/Z, fY/Z) = (1, 2) for f = 1, so (a) is false. The image point lies on the ray from the centre (b ✓). Image coordinates are proportional to f (c ✓). Central projection maps 3D lines to 2D lines (d ✓).");

/* ======================= WEEK 4 : Two view / epipolar geometry ======================= */
Q("w4q1", 4, "MCQ", 3, "epipolar",
  "Given the right epipole e′(1, 4) and a point x′(3, 2) in the right image plane of a stereo imaging set-up, compute the epipolar line l′ containing the point x′, in the right image plane in homogeneous coordinates.",
  ["(0.2, 0.2, 1)", "(−0.2, 0.2, 1)", "(−0.2, −0.2, 1)", "(0.2, −0.2, 1)"], 2,
  "The epipolar line passes through e′ and x′: l′ = e′ × x′ = (1,4,1) × (3,2,1) = (4·1 − 1·2, 1·3 − 1·1, 1·2 − 4·3) = (2, 2, −10).\nNormalise so that the last entry is 1 → (−0.2, −0.2, 1).");

Q("w4q2", 4, "MCQ", 3, "epipolar",
  "Assume that a stereo set-up has two image planes, left and right. Which of the following could be a possible right null vector (= left epipole) of the fundamental matrix F = {{20 12 0 | 8 -7 59 | -4 33 -177}}?",
  ["(3, 5, 1)", "(−6, 10, 2)", "(6, −10, 1)", "(3, −5, 1)"], 1,
  "The right null vector e satisfies F e = 0. Test the options: F·(−6, 10, 2)ᵀ = (−120+120+0, −48−70+118, 24+330−354) = (0, 0, 0) ✓.");

Q("w4q3", 4, "MCQ", 3, "epipolar",
  "Stereo set-up: left calibration matrix K = {{1 1 2 | 0 2 0 | 0 0 1}}, right calibration matrix K′ = {{1 5 3 | 0 1 2 | 0 0 2}}. The viewing direction of the right camera is R = {{1 0 0 | 0 0 1 | 0 1 0}}. Find the homography matrix H.",
  ["{{1 1 3 | 3 1 1 | 2 0 0}}", "{{1 2 3 | 0 1 2 | 5 0 3}}", "{{1 5 3 | 2 1 2 | 3 3 2}}", "{{1 1 3 | 0 1 1 | 0 1 0}}"], 3,
  "H = K′ R K⁻¹ (infinite homography).\nK⁻¹ = {{1 -0.5 -2 | 0 0.5 0 | 0 0 1}}; R K⁻¹ = {{1 -0.5 -2 | 0 0 1 | 0 0.5 0}};\nK′ (R K⁻¹) = {{1 1 3 | 0 1 1 | 0 1 0}}.");

Q("w4q4", 4, "MCQ", 2, "epipolar",
  "Same set-up as the previous question. Given the translation vector t = (2, 1, 0) of the centre of the right camera with reference to the left camera, compute the right epipole.",
  ["(4, 2, 1)", "(7, 1, 0)", "(7, 1, 2)", "(2, 1, 0)"], 1,
  "Right epipole e′ = K′ t = {{1 5 3 | 0 1 2 | 0 0 2}} · (2, 1, 0)ᵀ = (2 + 5, 1, 0) = (7, 1, 0).");

Q("w4q5", 4, "MCQ", 3, "epipolar",
  "Same set-up. Compute the fundamental matrix F assuming the translation vector of the right camera centre with reference to the left camera is (2, 1, 0).",
  ["{{0 1 0 | 0 -7 0 | -1 0 4}}", "{{0 1 0 | 0 -7 0 | -1 6 4}}", "{{1 1 3 | 0 1 1 | -7 -6 -20}}", "{{0 -1 0 | 0 7 0 | 1 -6 -4}}"], 1,
  "F = [e′]ₓ H with e′ = (7, 1, 0) and H = {{1 1 3 | 0 1 1 | 0 1 0}}.\n[e′]ₓ = {{0 0 1 | 0 0 -7 | -1 7 0}}  (skew-symmetric matrix of e′ = (7,1,0))\nF = [e′]ₓ H = {{0 1 0 | 0 -7 0 | -1 6 4}}.");

Q("w4q6", 4, "MCQ", 3, "epipolar",
  "Given the fundamental matrix F = {{-1 3 2 | 1 1 0 | 1 1 0}} and two points (2, 3) and (4, −2) in the left image, compute the corresponding epipolar lines in the right image plane.",
  ["(−9, 5, 5), (−8, 2, 2)", "(9, 5, −5), (−8, 2, 2)", "(9, 5, 5), (−8, 2, 2)", "(−9, 5, 5), (8, 2, 2)"], 2,
  "Epipolar line l′ = F x.\nF·(2,3,1)ᵀ = (−2+9+2, 2+3, 2+3) = (9, 5, 5).\nF·(4,−2,1)ᵀ = (−4−6+2, 4−2, 4−2) = (−8, 2, 2).");

Q("w4q7", 4, "MCQ", 3, "epipolar",
  "Using the same F and the two epipolar lines found in the previous question, find the right epipole.",
  ["(0, 58, 58)", "(0, −58, 58)", "(0, 58, −58)", "(0, −58, −58)"], 1,
  "All epipolar lines in the right image pass through the right epipole, so e′ = l′₁ × l′₂.\n(9,5,5) × (−8,2,2) = (5·2 − 5·2, 5·(−8) − 9·2, 9·2 − 5·(−8)) = (0, −58, 58).");

Q("w4q8", 4, "NUM", 3, "stereo",
  "Stereo set-up with P = {{2 0 0 0 | 0 2 0 0 | 0 0 1 0}} (left camera) and P′ = {{2 0 0 5 | 0 2 0 0 | 0 0 1 0}} (right camera). The image coordinates of a 3D point are (10, 3) and (15, 3) in the left and right cameras. Compute its depth (z-coordinate). Answer only the magnitude.",
  null, 1,
  "P = K[I|0], P′ = K[I|t] with K = diag(2,2,1) and K t = (5,0,0) → baseline t = 2.5.\nDisparity x′ − x = 15 − 10 = 5.\nZ = f·B / disparity = (2 × 2.5)/5 = 1.", { tol: 0.01 });

Q("w4q9", 4, "MCQ", 3, "epipolar",
  "Given the rotation R = {{1 0 0 | 0 0 1 | 0 1 0}} and translation t = (1, 1, 1) of the right camera, compute the essential matrix E of a calibrated stereo set-up.",
  ["{{0 2 1 | -1 1 0 | -2 0 -1}}", "{{0 -2 -1 | 1 -1 0 | 2 0 1}}", "{{0 1 -1 | 1 -1 0 | -1 0 1}}", "{{-2 -1 0 | -1 1 1 | 0 -1 1}}"], 2,
  "E = [t]ₓ R.\n[t]ₓ for t = (1,1,1) = {{0 -1 1 | 1 0 -1 | -1 1 0}}.\n[t]ₓ R = {{0 1 -1 | 1 -1 0 | -1 0 1}}.");

Q("w4q10", 4, "MSQ", 3, "epipolar",
  "Stereo set-up with P = {{1 0 0 0 | 0 1 0 0 | 0 0 1 0}} (left) and P′ = {{1 2 5 1 | 2 0 0 2 | 3 0 2 1}} (right). Which of the following are correct?",
  ["F = {{4 0 0 | 2 2 -3 | 0 -4 -10}}", "The right epipole is (1, 2, 1).", "F = {{4 0 4 | -2 2 3 | 0 -4 -10}}", "The right epipole is (0, 0, 1)."], [1, 2],
  "Left camera is at the origin C = (0,0,0,1), so the right epipole is e′ = P′C = last column of P′ = (1, 2, 1).\nF = [m]ₓ M, where m = last column of P′ and M = its left 3×3 block:\nF = {{4 0 4 | -2 2 3 | 0 -4 -10}}.");

/* ======================= WEEK 5 : Stereo geometry ======================= */
Q("w5q1", 5, "MCQ", 3, "epipolar",
  "Compute the essential matrix E, given upper-triangular calibration matrices K = {{2 1 1 | 0 3 2 | 0 0 1}}, K′ = {{1 1 2 | 0 2 1 | 0 0 1}} and a rank-2 fundamental matrix F = {{0 1 2 | 1 0 3 | -2 -3 0}}.",
  ["{{0 3 4 | 4 5 12 | -2 -4 4}}", "{{2 8 11 | 1 5 8 | 0 1 3}}", "{{2 8 11 | 1 5 8 | -2 -5 -3}}", "None of the above"], 0,
  "E = K′ᵀ F K  (the relation between F and E).\nComputing the product gives E = {{0 3 4 | 4 5 12 | -2 -4 4}}.");

Q("w5q2", 5, "MCQ", 3, "stereo",
  "Compute the homography induced by the plane at infinity, H∞, for the camera matrices P = {{1 1 0 2 | 0 1 0 1 | 0 0 1 3}} and P′ = {{2 1 1 1 | 1 2 0 2 | 0 0 1 1}}.",
  ["{{2 -1 1 | 1 1 0 | 0 0 1}}", "{{2 1 1 | 1 -1 0 | 0 0 1}}", "{{1 -1 1 | 1 1 0 | 0 0 1}}", "{{2 -1 0 | 1 1 1 | 0 0 1}}"], 0,
  "H∞ = M′ M⁻¹ where M and M′ are the left 3×3 blocks of P and P′.\nM = {{1 1 0 | 0 1 0 | 0 0 1}}, M⁻¹ = {{1 -1 0 | 0 1 0 | 0 0 1}}, M′ = {{2 1 1 | 1 2 0 | 0 0 1}}.\nH∞ = M′M⁻¹ = {{2 -1 1 | 1 1 0 | 0 0 1}}.");

Q("w5q3", 5, "MCQ", 3, "stereo",
  "Stereo set-up with P = {{8 0 0 0 | 0 8 0 0 | 0 0 1 0}} and P′ = {{8 0 0 16 | 0 8 0 0 | 0 0 1 0}}. If the image coordinates of a 3D point are (2, 4) and (6, 4) in the left and right cameras respectively, compute its depth.",
  ["2", "4", "6", "8"], 1,
  "P = K[I|0], P′ = K[I|t]; K = diag(8,8,1), K t = (16,0,0).\nDisparity relation: x′ = x + (K t)ₓ / Z → 6 = 2 + 16/Z → Z = 4.");

Q("w5q4", 5, "MCQ", 1, "epipolar",
  "Suppose the motion of the cameras is pure translation with no rotation and no change in internal camera parameters. Let the epipole in the right image plane be e′ = (0, 0, 1)ᵀ. Compute the corresponding fundamental matrix.",
  ["{{0 -1 0 | 1 0 0 | 0 0 0}}", "{{0 0 1 | 0 0 0 | -1 0 0}}", "{{0 -1 1 | 1 0 0 | 0 0 1}}", "{{1 0 0 | 0 1 0 | 0 0 1}}"], 0,
  "For pure translation (no rotation, same K): F = [e′]ₓ.\n[e′]ₓ for e′ = (0,0,1) = {{0 -1 0 | 1 0 0 | 0 0 0}}.");

Q("w5q5", 5, "MCQ", 1, "camera",
  "Given the camera matrix P = {{1 0 0 2 | 0 1 0 3 | 0 0 1 4}}, compute the camera centre C.",
  ["(2, 3, 4, 1)", "(−2, −3, −4, 1)", "(0, 0, 0, 1)", "(1, 1, 1, 1)"], 1,
  "For P = [M | p₄], PC = 0 gives C = (−M⁻¹p₄, 1). Here M = I, p₄ = (2,3,4) → C = (−2, −3, −4, 1).");

Q("w5q6", 5, "MCQ", 2, "camera",
  "Given P = {{2 1 3 1 | 1 4 2 2 | 3 1 1 1}}, its pseudo-inverse P⁺ (4×3) and camera centre C = (−1, 2, 1, 1)ᵀ, identify two points on the ray corresponding to the image point x = (2, 1, 1)ᵀ.",
  ["Only P⁺x", "C at λ = 0, P⁺x at λ = ∞", "P⁺x at λ = 0, C at λ = ∞", "None of the above"], 2,
  "The back-projected ray is X(λ) = P⁺x + λC.\nTwo points on it: P⁺x (at λ = 0) and the camera centre C (as λ → ∞). Note x must be in homogeneous form so that P⁺x is a valid 4×1 point.");

Q("w5q7", 5, "MCQ", 1, "epipolar",
  "Suppose the camera motion is pure translation parallel to the y-axis with no rotation and no change in internal parameters. If the epipole is e′ = (0, 1, 0)ᵀ, compute the fundamental matrix.",
  ["{{0 -1 0 | 1 0 0 | 0 0 0}}", "{{0 0 1 | 0 0 0 | -1 0 0}}", "{{0 0 0 | 0 0 -1 | 0 1 0}}", "{{-1 0 0 | 0 0 -1 | 0 -1 0}}"], 1,
  "F = [e′]ₓ with e′ = (0,1,0): [e′]ₓ = {{0 0 1 | 0 0 0 | -1 0 0}}.");

Q("w5q8", 5, "MCQ", 3, "stereo",
  "Stereo set-up with P = {{6 0 0 0 | 0 6 0 0 | 0 0 1 0}} and P′ = {{6 0 0 12 | 0 6 0 0 | 0 0 1 0}}. If the image coordinates are (3, 5) and (7, 5), compute the depth.",
  ["2", "3", "4", "5"], 1,
  "K = diag(6,6,1), K t = (12,0,0) → (K t)ₓ = 12.\nx′ = x + (K t)ₓ/Z → 7 = 3 + 12/Z → Z = 3.");

Q("w5q9", 5, "MCQ", 3, "epipolar",
  "Check whether the fundamental matrix F = {{2 1 0 | 3 -1 2 | 1 2 -3}} and the camera matrices P = {{1 2 3 1 | 2 1 1 2 | 3 2 1 1}}, P′ = {{2 1 3 2 | 1 2 2 1 | 3 1 1 2}} are compatible.",
  ["Yes", "No"], 1,
  "Compatibility condition: P′ᵀ F P must be skew-symmetric (this is the condition for x′ᵀFx = 0 to hold for all projections of the same 3D point).\nThe computed matrix is not skew-symmetric → NOT compatible.");

Q("w5q10", 5, "MSQ", 2, "stereo",
  "Consider a stereo set-up with camera matrices P = K[I|0] and P′ = K[I|t], where the translation is only along the x-axis and there is no rotation. Which of the following are correct?",
  ["The fundamental matrix must always be a full rank matrix.", "The epipolar lines in the two images are parallel.", "The essential matrix has rank 3.", "The disparity between corresponding image points can be used to estimate depth."], [1, 3],
  "Pure x-translation gives parallel (horizontal) epipolar lines (b ✓). F always has rank 2, never full rank (a ✗). E also has rank 2 (c ✗). Depth: Z = f·B/d (d ✓).");

/* ======================= WEEK 6 : Feature detection ======================= */
Q("w6q1", 6, "MCQ", 1, "matching",
  "Given two features each of size 7 as f(3, 6, 2, 5, 1, 4, 7) and g(3, 4, 3, 1, 2, 3, 9). Compute the L1 and L2 norms between f and g respectively.",
  ["11 and 3.16", "11 and 5.20", "10 and 5.20", "10 and 3.16"], 1,
  "Differences |f − g| = 0, 2, 1, 4, 1, 1, 2.\nL1 = Σ|f−g| = 11.   L2 = √Σ(f−g)² = √(0+4+1+16+1+1+4) = √27 = 5.20.");

Q("w6q2", 6, "MCQ", 3, "dimred",
  "Consider the matrix representing 4 sample data points (1,2), (2,1), (3,2), (2,3): X = {{1 2 | 2 1 | 3 2 | 2 3}}. Compute the covariance matrix using the data points from X.",
  ["{{1 0 | 0 1}}", "{{0.5 0 | 0 0.5}}", "{{0.25 0 | 0 0.25}}", "{{2 0 | 0 2}}"], 1,
  "Mean = [(1+2+3+2)/4, (2+1+2+3)/4] = [2, 2].\nCentred X̃ = {{-1 0 | 0 -1 | 1 0 | 0 1}}.\nCovariance = X̃ᵀX̃ / 4 = {{2 0 | 0 2}}/4 = {{0.5 0 | 0 0.5}}.");

Q("w6q3", 6, "MCQ", 2, "range",
  "Consider the parametric equations x = 2t³ − t² and y = t³ + 3t representing a 2D curve. Compute the tangent vector at t = 2.",
  ["(4, 15)", "(20, 15)", "(20, 5)", "(15, 5)"], 1,
  "x′ = 6t² − 2t, y′ = 3t² + 3.\nAt t = 2: x′ = 24 − 4 = 20, y′ = 12 + 3 = 15 → (20, 15).");

Q("w6q4", 6, "MSQ", 2, "fitting",
  "Which of the following is/are true?",
  ["RANSAC is best suited for fitting outliers.",
   "Hough transform is best suited for line fitting in the presence of many lines.",
   "Kullback-Leibler divergence is best suited to find the 'optimal' line parameters when points belonging to a line are given.",
   "The average-case time complexity of NN search using a K-D tree is O(log N + 2^d), where d is the dimension of the feature space."], [1, 3],
  "RANSAC fits a model to INLIERS despite outliers (a ✗). Hough handles multiple lines (b ✓). KL divergence compares probability distributions – not a geometric fitting criterion (c ✗). K-D tree NN search: O(log N + 2^d) average (d ✓).");

Q("w6q5", 6, "MCQ", 3, "features",
  "Gradient along x and y at a pixel location is given by (I(x+1) − I(x−1))/2 and (I(y+1) − I(y−1))/2. The top-left corner is (1,1); x increases to the right and y downward. For the 3×3 matrix A = {{0.2 0.7 0.4 | 0.4 0.2 0.9 | 0.3 0.5 0.5}}, compute Iₓ and I_y at the centre pixel.",
  ["Iₓ = −0.05 and I_y = 0.15", "Iₓ = 0.05 and I_y = −0.15", "Iₓ = 0.25 and I_y = −0.1", "None of these"], 2,
  "Centre pixel = 0.2 (row 2, col 2).\nIₓ = (0.9 − 0.4)/2 = 0.25.\nI_y = (0.5 − 0.7)/2 = −0.1  (pixel below minus pixel above).");

Q("w6q6", 6, "MCQ", 2, "features",
  "If an octave in SIFT has 10 images, then the scale factor by which each image in the octave differs from the next image is",
  ["1.080", "1.065", "1.071", "1.090"], 0,
  "If an octave has s + 1 images, adjacent scales differ by k = 2^(1/s).\n10 images → s = 9 → k = 2^(1/9) = 1.080.");

Q("w6q7", 6, "MCQ", 1, "dimred",
  "Find the eigenvalues of the matrix {{1 -2 | 2 1}}.",
  ["1, −2", "1 ± 2i", "−1 ± 2i", "1, 2"], 1,
  "det(A − λI) = (1 − λ)² + 4 = 0 → λ² − 2λ + 5 = 0 → λ = (2 ± √(4 − 20))/2 = 1 ± 2i.");

Q("w6q8", 6, "MSQ", 1, "features",
  "Which of the following is/are true for edge and corner detection?",
  ["A corner will have low maximal and minimal curvatures.",
   "A corner will have high maximal and minimal curvatures.",
   "An edge will have low maximal curvature, but very high minimal curvature.",
   "An edge will have high maximal curvature, but very low minimal curvature."], [1, 3],
  "Corner: BOTH curvatures (eigenvalues) high. Edge: one high (across the edge) and one very low (along the edge). Flat: both low.");

Q("w6q9", 6, "MCQ", 3, "features",
  "Consider a 3×3 neighbourhood A = {{80 200 130 | 120 192 100 | 290 180 132}}. Obtain a single Local Binary Pattern (LBP) code with the centre pixel as reference. Weight table (centre is the reference): {{2⁰ 2¹ 2² | 2⁷ – 2³ | 2⁶ 2⁵ 2⁴}}",
  ["66", "64", "2", "62"], 0,
  "Centre = 192. Neighbours greater than 192 → 1, else 0: only 200 and 290 are greater.\nThresholded: {{0 1 0 | 0 · 0 | 1 0 0}}.\nWeights of those positions: 2¹ = 2 (200) and 2⁶ = 64 (290).\nLBP = 2 + 64 = 66.");

Q("w6q10", 6, "MSQ", 2, "features",
  "Which of the following is/are true for SIFT and SURF?",
  ["Computation of scale space and histograms of gradient direction are approximated in SURF compared to SIFT.",
   "Integral images are used in SURF to speed up computation.",
   "Small Gaussians used in SIFT are approximated by box filters in SURF.",
   "Haar wavelet responses are used to accumulate the orientation in SIFT and SURF descriptors."], [0, 1, 2],
  "SURF = faster approximation of SIFT: box filters approximating Gaussian 2nd-derivatives, integral images for fast box sums, Haar-wavelet responses for orientation/descriptor (SURF only – SIFT uses gradient-orientation histograms, so (d) is false).");

/* ======================= WEEK 7 : Feature matching & model fitting ======================= */
Q("w7q1", 7, "MCQ", 3, "fitting",
  "Using the method of least squares, find an equation of the form y = ax + b that fits the data (x, y): [(0,2), (1,5), (2,8)].",
  ["y = 3x − 2", "y = 2x + 3", "y = 3x + 2", "y = 3.1x + 1.9"], 2,
  "Normal equations: a·Σx² + b·Σx = Σxy and a·Σx + n·b = Σy.\nΣx = 3, Σy = 15, Σx² = 5, Σxy = 21, n = 3.\n5a + 3b = 21 and 3a + 3b = 15 → a = 3, b = 2 → y = 3x + 2.");

Q("w7q2", 7, "MCQ", 1, "fitting",
  "Consider two points a = (2, 5) and b = (4, 1) in image space. Compute the two straight lines corresponding to them in parameter space using the Hough transform.",
  ["c = −2m + 5 and c = −4m + 1", "c = −2m + 1 and c = −4m + 5", "c = −5m + 2 and c = −m + 4", "c = 2m − 5 and c = 4m − 1"], 0,
  "From y = mx + c  →  c = −mx + y. Each image point (x, y) becomes a line in (m, c) space with slope −x and intercept y.\n(2,5) → c = −2m + 5;  (4,1) → c = −4m + 1.");

Q("w7q3", 7, "MSQ", 1, "fitting",
  "Which of the following are examples of model fitting given some data points?",
  ["Estimating an affine transformation matrix between two keypoint sets",
   "Image histogram equalized profile optimization matching maps",
   "Finding an optimal 3D plane out of scattered point-cloud data",
   "Robust circle estimation from noisy boundary edge points"], [0, 2, 3],
  "Model fitting = finding the parameters of a parametric model (affine matrix, plane, circle …) that best explains noisy data points. Histogram equalization is not model fitting.");

Q("w7q4", 7, "MCQ", 3, "matching",
  "Given two features of size 4: f = [1, 3, 2, 6] and g = [2, 2, 4, 4]. Compute the normalized cross correlation and the cosine similarity, respectively.",
  ["NCC = 0.8944 and Cosine = 0.5345", "NCC = 0.5345 and Cosine = 0.8944", "NCC = 0.6000 and Cosine = 0.7500", "NCC = 0.4444 and Cosine = 0.7071"], 1,
  "NCC = cov(f,g)/(σf σg) (i.e. correlation of mean-subtracted vectors); cosine = f·g / (‖f‖‖g‖).\nmean f = mean g = 3. f−3 = (−2,0,−1,3), g−3 = (−1,−1,1,1): dot = 4, norms = √14 and 2 → NCC = 4/(3.742·2) = 0.5345.\nf·g = 2+6+8+24 = 40, ‖f‖ = √50, ‖g‖ = √40 → cosine = 40/44.72 = 0.8944.");

Q("w7q5", 7, "MCQ", 1, "matching",
  "Let d₁ (= 3), d₂ (= 9) be the distances to the nearest and the next nearest neighbours from a query feature, for a threshold of 0.4 in the nearest-neighbour-distance-ratio (NNDR) method. Choose the correct option:",
  ["The ratio d₁/d₂ accepts the nearest neighbour as a match", "The ratio d₁/d₂ rejects the nearest neighbour as a match", "The ratio d₂/d₁ accepts the nearest neighbour as a match", "The ratio d₁/d₂ accepts the nearest neighbour only if the ratio is greater than 0.4"], 0,
  "d₁/d₂ = 3/9 = 0.33 < 0.4 → the match is distinctive → accepted. (NNDR accepts when the ratio is SMALLER than the threshold.)");

Q("w7q6", 7, "MCQ", 3, "matching",
  "Two probability distributions over 4 discrete values: P = (1/2, 1/4, 1/8, 1/8) and Q = (1/4, 1/4, 1/4, 1/4). Compute the KL divergence D_KL(P‖Q).",
  ["0.3466", "0.2500", "0.1733", "0.3122"], 2,
  "D_KL(P‖Q) = Σ p(i) ln(p(i)/q(i)).\n= ½ ln2 + ¼ ln1 + ⅛ ln(½) + ⅛ ln(½)\n= 0.3466 + 0 − 0.0866 − 0.0866 = 0.1733.");

Q("w7q7", 7, "MCQ", 1, "matching",
  "Which of the following statements about a KD-tree is correct?",
  ["A KD-tree always splits the data using the same coordinate axis at every level.",
   "In a KD-tree, each internal node partitions the space into two regions using one coordinate axis.",
   "A KD-tree guarantees perfectly balanced partitions irrespective of insertion order.",
   "KD-trees can only store 2-dimensional points."], 1,
  "A k-d tree is a binary space-partitioning tree: each node splits the space with a hyperplane perpendicular to one (cycling) axis. Axes alternate (a ✗), balance depends on insertion order (c ✗) and any dimension k works (d ✗).");

Q("w7q8", 7, "MCQ", 3, "fitting",
  "Using RANSAC, compute the number of samples N required to achieve a 99% probability (p) of obtaining at least one pure inlier set, given an outlier ratio of 20% (e) and a minimal sample size s = 2. Round to the nearest integer.",
  ["N = 5", "N = 7", "N = 9", "None of the above"], 0,
  "N = ln(1 − p) / ln(1 − (1 − e)^s) = ln(0.01) / ln(1 − 0.64) = −4.605 / −1.022 = 4.5 → 5.");

Q("w7q9", 7, "MCQ", 3, "matching",
  "Consider the points in the 2D plane (5,5), (12,10), (8,1), (2,8), (10,14). After building a 2D binary search tree (KD-tree) inserting in the given order and starting with an X-split, which point becomes the left child of the root node?",
  ["(12, 10)", "(2, 8)", "(8, 1)", "(10, 14)"], 1,
  "Insert (5,5) → root (x-split).\n(12,10): 12 > 5 → right of root.\n(8,1): 8 > 5 → right, at (12,10) compare y: 1 < 10 → left of (12,10).\n(2,8): 2 < 5 → LEFT child of root.\n(10,14): right, at (12,10) y: 14 > 10 → right child.\nLeft child of the root = (2, 8).");

Q("w7q10", 7, "MCQ", 2, "fitting",
  "A least-squares line y = ax + b has a = 2.5 and b = −1.0. If every y-coordinate is increased by exactly 3 units (y′ = y + 3), what will be the new slope a′ and intercept b′?",
  ["a′ = 5.5, b′ = −1.0", "a′ = 2.5, b′ = 2.0", "a′ = 7.5, b′ = −3.0", "a′ = 2.5, b′ = −1.0"], 1,
  "Shifting all y by 3 simply shifts the fitted line up by 3: slope unchanged (a′ = 2.5), intercept b′ = b + 3 = 2.0.");

/* ======================= WEEK 8 : Colour & demosaicing ======================= */
Q("w8q1", 8, "MCQ", 1, "color",
  "Consider a pixel p in RGB space given by (40, 50, 30). What is the saturation value of this pixel in HSI colour space?",
  ["0.15", "0.25", "0.33", "0.45"], 1,
  "Intensity I = (R + G + B)/3 = 40.\nS = 1 − min(R,G,B)/I = 1 − 30/40 = 0.25.");

Q("w8q2", 8, "MCQ", 1, "color",
  "What is the corresponding value of the pixel p = (40, 50, 30) in CMY space?",
  ["(215, 105, 165)", "(200, 150, 225)", "(115, 205, 165)", "(215, 205, 225)"], 3,
  "(C, M, Y) = (255, 255, 255) − (R, G, B) = (215, 205, 225).");

Q("w8q3", 8, "MSQ", 2, "color",
  "Which of the following statements are correct?",
  ["Colour captured in the RGB colour space is not suitable for direct interpretation of colour components.",
   "The CIE chromaticity chart represents colours in a 2-D space according to the tri-stimulus model of colour representation.",
   "In digital cameras colour images are mostly captured using a CFA.",
   "Luminance Y is encoded using fewer bits than chrominance values I and Q."], [0, 1, 2],
  "(d) is false: luminance Y is encoded with MORE bits (more bandwidth) than the chrominance I and Q, because the eye is more sensitive to brightness detail than colour detail.");

Q("w8q4", 8, "NUM", 3, "color",
  "Interpolate G5 using Laplacian-corrected edge-correlated interpolation for the Bayer pattern\n{{B1 G2 B3 | G4 B5 G6 | B7 G8 B9}}\nwith the corresponding CFA values\n{{32 90 32 | 72 90 130 | 136 94 26}}",
  null, 104,
  "ΔH = |G4 − G6| + |2·B5 − B3 − B7| = |72 − 130| + |180 − 32 − 136| = 58 + 12 = 70.\nΔV = |G2 − G8| + |2·B5 − B1 − B9| = |90 − 94| + |180 − 32 − 26| = 4 + 122 = 126.\nΔH < ΔV → interpolate along the horizontal direction:\nG5 = (G4 + G6)/2 + (2·B5 − B3 − B7)/4 = 101 + 3 = 104.", { tol: 0.5 });

Q("w8q5", 8, "MCQ", 3, "color",
  "The colour of a source illuminant is the RGB vector (120, 160, 200), whereas the target colour is (60, 120, 150). Given a colour vector (120, 80, 160) in the source image, compute the colour-corrected vector using the diagonal correction rule.",
  ["(90, 90, 180)", "(75, 150, 75)", "(50, 100, 50)", "(100, 50, 100)"], 0,
  "Diagonal gains: k_r = 60/120 = 0.5, k_g = 120/160 = 0.75, k_b = 150/200 = 0.75.\nNaive correction: (60, 60, 120). The brightness-preserving version scales by f = (R+G+B)/(k_rR + k_gG + k_bB) = 360/(60+60+120) = 1.5\n→ (90, 90, 180).");

Q("w8q6", 8, "MSQ", 2, "color",
  "Which of the following statements are true?",
  ["Image reconstruction using colour demosaicing leads to sharp edges in an image.",
   "The green channel is less likely to be aliased.",
   "In a CFA, green channels are sampled at a higher rate than red and blue.",
   "High correlation between the red, green and blue channels makes it likely that they have similar texture and edge locations."], [1, 2, 3],
  "Demosaicing (interpolation) tends to BLUR edges (a ✗). Bayer CFA: 50 % green, 25 % red, 25 % blue → green is sampled twice as densely, so it is least aliased and preserves detail best. R, G, B channels are strongly correlated (similar edges/texture), which is what edge-directed demosaicing exploits.");

Q("w8q7", 8, "NUM", 3, "color",
  "Bayer pattern (5×5, row-wise): G1 R2 G3 R4 G5 / B6 G7 B8 G9 B10 / G11 R12 G13 R14 G15 / B16 G17 B18 G19 B20 / G21 R22 G23 R24 G25 with CFA values\n{{10 14 18 24 30 | 15 25 35 45 55 | 24 45 150 225 168 | 65 87 124 100 144 | 34 225 200 235 245}}\nUsing interpolation by averaging, compute G8.",
  null, 59.5,
  "G8 is at a blue pixel; its four green neighbours are G3 (above), G7 (left), G9 (right) and G13 (below).\nG8 = (G3 + G7 + G9 + G13)/4 = (18 + 25 + 45 + 150)/4 = 59.5.", { tol: 0.05 });

Q("w8q8", 8, "NUM", 3, "color",
  "Using the same Bayer pattern and CFA values as the previous question and the colour-ratio (hue) interpolation of blue, compute B12.",
  null, 64.7,
  "Hue-based interpolation: B12 = (G12/4)·(B6/G6 + B8/G8 + B16/G16 + B18/G18), i.e. the average of the B/G colour ratios at the four diagonal blue neighbours, multiplied by the (interpolated) green value at 12. Official key: 64.7.", { tol: 0.1 });

Q("w8q9", 8, "MCQ", 3, "color",
  "Given the coordinates in the normalized x-y chromaticity space of three primaries R = (2/3, 1/3), G = (1/5, 3/4), B = (1/6, 1/10), compute the maximally saturated colour in the x-y chromaticity space preserving the same hue and intensity for the point q = (0.31, 0.27). White point w = (1/3, 1/3).",
  ["approximately (0.489, 0.308)", "approximately (0.708, 0.186)", "approximately (0.269, 0.154)", "approximately (0.208, 0.286)"], 2,
  "Draw the line from the white point w through q until it hits the edge of the gamut triangle (R-G-B). That intersection is the maximally saturated colour with the same hue.\nLines via cross products (homogeneous): BG, BR, GR and wq. Intersecting wq with each edge gives (0.154, −0.154) [BG – outside], (0.410, 0.564) [GR – outside] and (0.269, 0.154) [BR – valid]. Answer ≈ (0.269, 0.154).");

Q("w8q10", 8, "NUM", 3, "color",
  "Same Bayer layout as before with CFA values {{10 20 18 24 30 | 15 25 35 45 55 | 24 45 150 200 168 | 65 87 124 100 144 | 34 225 200 235 245}}. Interpolate R19 and R7 using bilinear interpolation and compute R19 + R7 (1 decimal place).",
  null, 250.0,
  "R19 sits between R14 (above) and R24 (below): R19 = (R14 + R24)/2 = (200 + 235)/2 = 217.5.\nR7 sits between R2 (above) and R12 (below): R7 = (R2 + R12)/2 = (20 + 45)/2 = 32.5.\nSum = 250.0.", { tol: 0.05 });

/* ======================= WEEK 9 : Range images ======================= */
Q("w9q1", 9, "MCQ", 1, "range",
  "In binary (Gray-code) structured-light encoding, n patterns are projected. How many distinct stripes can be uniquely encoded?",
  ["n", "2n", "2ⁿ", "n²"], 2,
  "Each stripe gets a unique n-bit codeword from the n projected black/white patterns; n bits → 2ⁿ distinct codewords.");

Q("w9q2", 9, "MCQ", 2, "range",
  "In a 3-pattern binary structured-light system, what is the 3-bit Gray code assigned to stripe number 5 (0-indexed)?",
  ["101", "111", "110", "100"], 1,
  "Gray code g = n XOR (n >> 1).  5 = 101₂; 101 XOR 010 = 111₂.");

Q("w9q3", 9, "MCQ", 1, "range",
  "Which of the following statements about the Microsoft Kinect (first generation) sensor is/are correct?\n(a) It projects an infrared laser speckle pattern onto the scene.\n(b) Points at greater depth appear more defocused/blurry in the IR image.\n(c) It operates on the principle of structured-light triangulation.",
  ["Only (a)", "Only (a) and (c)", "Only (b) and (c)", "All of the above"], 3,
  "Kinect v1: an IR laser projects a pseudo-random speckle pattern; an IR camera sees how it deforms (structured-light triangulation); the fixed-focus IR camera sees more blur for objects far from the focal plane. All true.");

Q("w9q4", 9, "MCQ", 3, "range",
  "Consider the surface z = xy parametrised as X(u,v) = (u, v, uv). Which of the following is the first fundamental form?",
  ["(1+v²)du² + 2uv du dv + (1+u²)dv²", "(1+v)du² + uv du dv + (1+u)dv²", "(1+v³)du² + 2uv du dv + (1+u³)dv²", "(1+v²)du² + uv du dv + (1+u²)dv²"], 0,
  "X_u = (1, 0, v), X_v = (0, 1, u).\nE = X_u·X_u = 1 + v², F = X_u·X_v = uv, G = X_v·X_v = 1 + u².\nds² = E du² + 2F du dv + G dv² = (1+v²)du² + 2uv du dv + (1+u²)dv².");

Q("w9q5", 9, "MCQ", 3, "range",
  "For the surface X(u,v) = (u, v², uv), compute the first fundamental form coefficients E, F, G at the point (u,v) = (1, 2).",
  ["E = 5, F = 2, G = 17", "E = 5, F = 4, G = 9", "E = 2, F = 4, G = 17", "E = 5, F = 2, G = 5"], 0,
  "X_u = (1, 0, v) = (1, 0, 2); X_v = (0, 2v, u) = (0, 4, 1).\nE = 1 + 0 + 4 = 5;  F = 0 + 0 + 2 = 2;  G = 0 + 16 + 1 = 17.");

Q("w9q6", 9, "MCQ", 1, "range",
  "Consider the 2D parametric curve x(t) = t² + t, y(t) = 2t − 1. Compute the tangent vector (x′(t), y′(t)) at t = 1.",
  ["(2, 2)", "(3, 2)", "(2, 4)", "(1, 2)"], 1,
  "x′ = 2t + 1, y′ = 2. At t = 1: (3, 2).");

Q("w9q7", 9, "MCQ", 3, "range",
  "Compute the direction of the surface normal (i.e. S_u × S_v before normalisation) at (u,v) = (1, 0) for the surface S(u,v) = (3u + v, u², 2v).",
  ["(4, −6, −2)", "(4, 6, −2)", "(−4, −6, 2)", "(4, −6, 2)"], 0,
  "S_u = (3, 2u, 0) = (3, 2, 0) at u = 1;  S_v = (1, 0, 2).\nS_u × S_v = (2·2 − 0·0, −(3·2 − 0·1), 3·0 − 2·1) = (4, −6, −2).");

Q("w9q8", 9, "MCQ", 3, "range",
  "Given E = 4, F = 1, G = 3, e = 5, f = 1, g = 2, compute the mean curvature H (up to 4 decimal places).",
  ["0.8182", "0.9545", "1.0455", "0.7273"], 1,
  "H = (E g + G e − 2 F f) / (2 (E G − F²)) = (4·2 + 3·5 − 2·1·1) / (2 (12 − 1)) = 21/22 = 0.9545.");

Q("w9q9", 9, "MCQ", 1, "range",
  "A surface patch at a point P has principal curvatures κ₁ = +3.2 and κ₂ = −1.7. Which of the following correctly classifies the surface at P and gives the sign of its Gaussian curvature K?",
  ["Pit surface; K > 0", "Saddle surface; K < 0", "Ridge surface; K = 0", "Flat surface; K = 0"], 1,
  "K = κ₁ κ₂ = 3.2 × (−1.7) = −5.44 < 0. Opposite-sign principal curvatures → saddle.");

Q("w9q10", 9, "MCQ", 2, "range",
  "Which of the following statements about edge detection in range images is correct?",
  ["Step edges are detected from zero crossings of Gaussian curvature.",
   "Roof edges are detected from zero crossings of Gaussian curvature.",
   "Roof edge points are detected by extrema of the dominant principal curvature along its corresponding direction.",
   "Step edge points are detected by extrema of the dominant principal curvature along its corresponding direction."], 2,
  "Step edges = depth discontinuities (jumps in range). Roof edges = two surfaces meeting at a dihedral angle; they are found as extrema of the dominant principal curvature along its direction.");

/* ======================= WEEK 10 : Classification, clustering, neural nets ======================= */
Q("w10q1", 10, "MSQ", 2, "nn",
  "Which of the following statements are true for an Artificial Neural Network?",
  ["A single neuron with two inputs and the signum activation function can implement an AND gate.",
   "A single neuron with two inputs and the signum activation function can implement an XOR gate.",
   "A single neuron with multiple inputs and the signum activation acts as a linear discriminator in a multidimensional feature space for two linearly separable classes.",
   "A single neuron with multiple inputs and the sigmoid activation computes the posterior of a class for a two-class classification problem."], [0, 2, 3],
  "AND is linearly separable → one perceptron can do it. XOR is NOT linearly separable → needs ≥ 2 layers. A single neuron's boundary wᵀx + b = 0 is a hyperplane. A sigmoid neuron models the posterior P(C₁|x) (exactly so for Gaussian classes with equal covariance).");

Q("w10q2", 10, "MCQ", 2, "classify",
  "Points on the x-axis and their class: 0.8→1, 1.2→1, 1.9→1, 2.5→2, 3.0→1, 3.5→1, 4.0→2, 4.8→2, 5.5→3, 6.2→3. Two new points 2.7 and 4.2 are introduced. Use KNN (K = 3) to determine their classes.",
  ["2.7: Class 2 and 4.2: Class 1", "2.7: Class 1 and 4.2: Class 2", "2.7: Class 1 and 4.2: Class 3", "2.7: Class 2 and 4.2: Class 2"], 1,
  "2.7: three nearest are 2.5 (class 2), 3.0 (class 1), 3.5 (class 1) → majority class 1.\n4.2: three nearest are 4.0 (class 2), 3.5 (class 1), 4.8 (class 2) → majority class 2.");

Q("w10q3", 10, "MCQ", 3, "classify",
  "Four objects with two attributes each: A(1,1), B(2,1), C(4,3), D(5,4). Form two clusters with K-means taking A and B as the initial centroids. What are the elements in each cluster after the first iteration?",
  ["Cluster 1: A, Cluster 2: B, C, D", "Cluster 1: A, D, Cluster 2: B, C", "Cluster 1: A, B, Cluster 2: C, D", "Cluster 1: A, C, Cluster 2: B, D"], 0,
  "Distances to centroid A(1,1): B = 1, C = 3.61, D = 5.\nDistances to centroid B(2,1): A = 1, C = 2.83, D = 4.24.\nB, C and D are all closest to centroid B (A is its own centroid, distance 0). Clusters: {A} and {B, C, D}.");

Q("w10q4", 10, "MCQ", 2, "classify",
  "In the Naive Bayes (Bayes) classifier, suppose the prior for class 1 is greater than for class 2. How does the decision boundary shift relative to equally probable priors – towards region R1 (decide class 1) or towards R2 (decide class 2)?",
  ["Towards region R1", "Towards region R2", "No shift in decision boundary", "It depends on the exact value of the priors"], 1,
  "A larger prior makes class 1 more likely overall, so its decision region R1 grows – the boundary moves into R2 (towards the less likely class).");

Q("w10q5", 10, "MCQ", 1, "classify",
  "You cluster 7 observations into 3 clusters using K-means. After the first iteration: C1 = {(2,2), (4,4), (6,6)}, C2 = {(0,4), (4,0)}, C3 = {(5,5), (9,9)}. What are the cluster centroids for the second iteration?",
  ["C1: (4,4), C2: (2,2), C3: (7,7)", "C1: (6,6), C2: (4,4), C3: (9,9)", "C1: (2,2), C2: (0,0), C3: (5,5)", "C1: (2,2), C2: (0,4), C3: (5,5)"], 0,
  "New centroid = mean of members.\nC1 = ((2+4+6)/3, (2+4+6)/3) = (4,4);  C2 = ((0+4)/2, (4+0)/2) = (2,2);  C3 = ((5+9)/2, (5+9)/2) = (7,7).");

Q("w10q6", 10, "MCQ", 3, "nn",
  "Feed-forward network: inputs i1, i2; hidden h1, h2; outputs o1, o2. Weights: W1 = 0.15, W2 = 0.20, W3 = 0.25, W4 = 0.31, W5 = 0.40, W6 = 0.45, W7 = 0.50, W8 = 0.55 (W1,W3 feed h1; W2,W4 feed h2; W5,W7 feed o1; W6,W8 feed o2). All activations are ReLU. What is the output for input [1, 1]?",
  ["o1: 0.21, o2: 0.68", "o1: 0, o2: 0", "o1: 0.37, o2: 0.53", "o1: 0.42, o2: 0.46"], 3,
  "h1 = ReLU(1·0.15 + 1·0.25) = 0.40;  h2 = ReLU(1·0.20 + 1·0.31) = 0.51.\no1 = ReLU(0.40·0.40 + 0.51·0.50) = ReLU(0.415) ≈ 0.42.\no2 = ReLU(0.40·0.45 + 0.51·0.55) = ReLU(0.4605) ≈ 0.46.\n(Figure from the original paper is not reproduced here; the wiring above is the one implied by the official solution.)");

Q("w10q7", 10, "MCQ", 3, "nn",
  "For the same network, what is the total error if the targets for o1 and o2 are 0 and 1, respectively? The error is E = ½ (target − output)² summed over outputs.",
  ["0.234", "0.468", "0.274", "0.548"], 0,
  "E = ½(0 − 0.42)² + ½(1 − 0.46)² = 0.0882 + 0.1458 = 0.234.");

Q("w10q8", 10, "MCQ", 3, "nn",
  "An optimisation algorithm is updating a 197-dimensional parameter space to train a single-hidden-layer feed-forward neural network. The input layer accepts a 10-dimensional feature vector and the output layer yields a 2-dimensional vector. How many neurons are in the hidden layer?",
  ["12", "15", "20", "25"], 1,
  "Parameters = (d_in + 1)·h + (h + 1)·d_out = 11h + 2h + 2 = 13h + 2.\n197 = 13h + 2 → h = 15.");

Q("w10q9", 10, "MSQ", 3, "classify",
  "Wire quality data (Durability, Strength → Label): (7,7)→bad, (7,4)→bad, (3,4)→good, (1,4)→good, (3,10)→good, (0,7)→good, (8,8)→bad, (6,3)→bad. A new wire has durability 3 and strength 7. After computing KNN (K = 3), which statements are true?",
  ["(3, 7) is a bad wire.", "The nearest sample to (3, 7) is at a distance of 4.", "(3, 7) is a good wire.", "The nearest sample to (3, 7) is at a distance of 3."], [2, 3],
  "Euclidean distances to (3,7): (7,7)=4, (7,4)=5, (3,4)=3, (1,4)=3.6, (3,10)=3, (0,7)=3, (8,8)=5.1, (6,3)=5.\nThree nearest: (3,4), (3,10), (0,7) – all 'good' at distance 3 → (3,7) is good, nearest distance = 3.");

Q("w10q10", 10, "MCQ", 3, "classify",
  "A prototype-based model has class vectors Cat = [4,1,3,0,2], Dog = [5,2,4,1,1], Fish = [1,0,1,5,4]. For the query x = [2,1,2,4,3], find the class with the highest cosine similarity and its value.",
  ["Fish, with a cosine similarity of 0.8412", "Dog, with a cosine similarity of 0.7106", "Fish, with a cosine similarity of 0.9231", "Cat, with a cosine similarity of 0.7854"], 2,
  "cos(a,b) = a·b/(‖a‖‖b‖). ‖x‖ = √34 = 5.83.\nCat: 21/(5.83·5.48) = 0.66;  Dog: 27/(5.83·6.86) = 0.68;  Fish: 36/(5.83·6.56) = 0.94.\nFish has by far the highest similarity.",
  { note: "Key note: the official key marks (c) 0.9231 as correct, but direct calculation gives ≈ 0.9415. The winner (Fish) is unambiguous and (c) is the closest Fish option – choose (c)." });

/* ======================= WEEK 11 : Dimensionality reduction & sparse representation ======================= */
Q("w11q1", 11, "MSQ", 1, "dimred",
  "Which of the following statements about PCA are FALSE?",
  ["PCA is a supervised dimensionality reduction technique.",
   "The principal components are the eigenvectors of the covariance matrix.",
   "PCA maximises the within-class scatter of the data.",
   "The number of principal components is always equal to the number of data points."], [0, 2, 3],
  "PCA is UNsupervised (uses no labels); components are eigenvectors of the covariance matrix (b is TRUE); PCA maximises total variance of the projection, not within-class scatter; the number of components is at most the data dimension (and ≤ N − 1), not N.");

Q("w11q2", 11, "MSQ", 3, "dimred",
  "Let X = {{1 3 | 2 4 | 3 5 | 4 6}} (rows = samples). Compute the unit vector along the direction of the dominant principal component of X.",
  ["(1.0, 0.0)", "(0.707, −0.707)", "(0.707, 0.707)", "(0.0, 1.0)"], [2],
  "Means: μ = (2.5, 4.5). Centred data: {{-1.5 -1.5 | -0.5 -0.5 | 0.5 0.5 | 1.5 1.5}}.\nCovariance = XcᵀXc/3 = (1/3){{5 5 | 5 5}} = {{1.67 1.67 | 1.67 1.67}}.\nEigenvalues 3.33 and 0; dominant eigenvector (1,1)/√2 = (0.707, 0.707).");

Q("w11q3", 11, "MSQ", 2, "dimred",
  "A dataset has covariance eigenvalues λ₁ = 50, λ₂ = 30, λ₃ = 15, λ₄ = 5. Which of the following are true?",
  ["Retaining the first two principal components preserves 80% of the total variance.",
   "The fourth principal component contributes significantly to the total variance.",
   "Retaining three components preserves exactly 95% of the total variance.",
   "PCA selects components to minimise reconstruction error in a least-squares sense."], [0, 2, 3],
  "Total = 100. First two: 80/100 = 80 %. First three: 95/100 = 95 %. λ₄ = 5 is the smallest → contributes least. PCA minimises mean-squared reconstruction error.");

Q("w11q4", 11, "MCQ", 3, "dimred",
  "Given class means μ₁ = (1, 2)ᵀ, μ₂ = (5, 4)ᵀ and within-class scatter S_W = {{4 0 | 0 1}}, compute the optimal Fisher LDA projection direction w = S_W⁻¹(μ₁ − μ₂).",
  ["(1, 2)", "(−1, −2)", "(−2, −1)", "(2, 1)"], 1,
  "S_W⁻¹ = {{0.25 0 | 0 1}}; μ₁ − μ₂ = (−4, −2).\nw = (0.25·(−4), 1·(−2)) = (−1, −2).");

Q("w11q5", 11, "MCQ", 3, "dimred",
  "Given class means μ₁ = (1, 1)ᵀ, μ₂ = (5, 5)ᵀ and S_W = {{2 0 | 0 2}}, compute the Fisher LDA direction w and the scalar projections of μ₁ and μ₂ onto w.",
  ["w = (−2, −2); projections: −4 and −20", "w = (−2, −2); projections: −2 and −10", "w = (2, 2); projections: 4 and 20", "w = (−2, −2); projections: 4 and 20"], 0,
  "w = S_W⁻¹(μ₁ − μ₂) = ½·(−4, −4) = (−2, −2).\nμ₁·w = −2 − 2 = −4;  μ₂·w = −10 − 10 = −20.");

Q("w11q6", 11, "MCQ", 3, "sparse",
  "Consider a dictionary with atoms d₁ = (1,1), d₂ = (1,−1), d₃ = (−1,1). Using OMP with sparsity k = 2, find the representation of y = (4, 2).",
  ["(4,2) = 4(1,1) + 2(1,−1)", "(4,2) = 3(1,1) + 1(−1,1)", "(4,2) = 2(1,1) + 2(1,−1)", "(4,2) = 3(1,1) + 1(1,−1)"], 3,
  "Iteration 1: correlations |⟨y,d₁⟩| = 6, |⟨y,d₂⟩| = 2, |⟨y,d₃⟩| = 2 → pick d₁; residual r = y − 6(1,1)·… (projection coefficient 3 for normalised atom) → r = (4,2) − 3(1,1) = (1,−1) ∝ d₂.\nIteration 2: pick d₂ (tie with d₃ broken to d₂). Least squares with A = [d₁ d₂] = {{1 1 | 1 -1}}: coefficients = (3, 1).\ny = 3·d₁ + 1·d₂ = 3(1,1) + 1(1,−1) = (4, 2) ✓.");

Q("w11q7", 11, "MSQ", 2, "sparse",
  "Which of the following are true about sparse representation and dictionaries?",
  ["A dictionary can be over-complete, i.e. it has more atoms than the signal dimension.",
   "OMP is a greedy algorithm that selects one atom per iteration.",
   "Sparse representation requires all atoms of the dictionary to be used.",
   "Basis Pursuit replaces the ℓ₀ minimisation with an ℓ₁ minimisation for tractability."], [0, 1, 3],
  "Over-complete dictionaries have more columns than rows. OMP greedily picks the atom most correlated with the residual each iteration. 'Sparse' means only a few atoms are used (c ✗). ℓ₀ minimisation is NP-hard; Basis Pursuit relaxes it to convex ℓ₁.");

Q("w11q8", 11, "MCQ", 2, "sparse",
  "In the K-SVD algorithm, during the dictionary update step for atom d_j, which of the following correctly describes the procedure?",
  ["Replace d_j with the mean of all data points assigned to it.",
   "Compute the residual error matrix E_j = X − Σ_{i≠j} dᵢ yᵢᵀ, then apply a rank-1 SVD to update d_j and the corresponding coefficients.",
   "Re-run OMP on the entire dataset and replace d_j with the dominant eigenvector.",
   "Set d_j to the normalised sum of all training signals."], 1,
  "K-SVD updates atoms one at a time: E_j (error without atom j, restricted to signals that use it) ≈ σ₁u₁v₁ᵀ. New atom d_j = u₁, new coefficients = σ₁v₁. This never increases ‖X − DY‖²_F.");

Q("w11q9", 11, "MCQ", 1, "sparse",
  "Which of the following correctly identifies how K-SVD generalises K-means clustering?",
  ["K-SVD uses ℓ₂ norm for reconstruction error, while K-means uses ℓ₁ norm.",
   "In K-means each data point is represented by exactly one cluster centre; in K-SVD each signal can be represented by a sparse combination of multiple dictionary atoms.",
   "K-SVD initialises its dictionary randomly, whereas K-means always uses a fixed initialisation.",
   "K-means allows each data point to be represented by multiple cluster centres; K-SVD restricts representation to one atom."], 1,
  "K-means = sparsity 1 with coefficient 1 (one centroid per point). K-SVD allows k > 1 atoms with real-valued coefficients → a generalisation of K-means.");

Q("w11q10", 11, "MCQ", 3, "dimred",
  "Two classes: X₁ = {(2,4), (4,2), (3,3)} and X₂ = {(8,6), (6,8), (7,7)}. Compute the within-class scatter matrix S_W (as defined in the course solution: S_W = (S₁ + S₂)/3).",
  ["{{2.0 -2.0 | -2.0 2.0}}", "{{1.33 -1.33 | -1.33 1.33}}", "{{4.0 0.0 | 0.0 4.0}}", "None of the above"], 1,
  "μ₁ = (3,3), μ₂ = (7,7).\nS₁ = Σ(x−μ₁)(x−μ₁)ᵀ = {{2 -2 | -2 2}}, S₂ = {{2 -2 | -2 2}}.\nS_W = (S₁ + S₂)/3 = (1/3){{4 -4 | -4 4}} = {{1.33 -1.33 | -1.33 1.33}}.");

/* ======================= WEEK 12 : CNNs & object detection ======================= */
Q("w12q1", 12, "MSQ", 1, "cnn",
  "Which of the following statements are true for Pooling?",
  ["It accumulates training data into a central buffer to optimise the gradient descent optimisation process.",
   "It provides translational invariance, allowing the network to detect features even if they are shifted, rotated, or slightly distorted.",
   "It reduces the spatial dimensions (width and height) of the feature maps, thereby decreasing the number of parameters and computational complexity.",
   "It selectively extracts dominant features (like maximum or average values) while discarding less prominent activations."], [1, 2, 3],
  "Pooling works on the internal feature maps layer by layer (a ✗); it down-samples, adds small-shift invariance and keeps the dominant responses (max / average).");

Q("w12q2", 12, "NUM", 3, "cnn",
  "Up-convolve the input x = {{0 3 | 3 2}} using the filter h = {{0 0.1 0 | 0.1 0.2 0.1 | 0 0.1 0}}. What is the value at (2,1) in the up-convolved feature map? (Index of the first cell is (0,0).)",
  null, 0.8,
  "Up-convolution: every input pixel x[i][j] multiplies a copy of the filter placed at its own location, and overlapping copies are summed (a 2×2 input and 3×3 filter give a 4×4 map):\nout(r,c) = Σ x[i][j]·h[r−i][c−j].\nResult = {{0 0 0.3 0 | 0 0.6 0.8 0.3 | 0.3 0.8 1.0 0.2 | 0 0.3 0.2 0}}\nValue at (row 2, col 1) = 3·h[1][1] + 2·h[1][0] = 0.6 + 0.2 = 0.8.", { tol: 0.01 });

Q("w12q3", 12, "NUM", 1, "cnn",
  "A model classifies a detected obstacle into Pedestrian, Bicycle, Car or Truck. For one sample the softmax output is [0.08, 0.12, 0.65, 0.15] and the true object is a Truck, i.e. the label is [0, 0, 0, 1]. Calculate the cross-entropy loss (natural log), rounded to 4 decimal places.",
  null, 1.8971,
  "L = −Σ yᵢ log pᵢ = −log(0.15) = 1.8971.", { tol: 0.0006 });

Q("w12q4", 12, "MSQ", 1, "cnn",
  "Which of the following statements are true for Batch Normalisation?",
  ["It returns the normalised mean and standard deviation of the weights.",
   "It normalises the intermediate layer activations across a mini-batch during training.",
   "It is a very efficient backpropagation technique.",
   "It allows using a higher learning rate."], [1, 3],
  "BN normalises activations (not weights) using the mini-batch mean/variance, stabilising the feature distribution; this lets you train with larger learning rates. It is not a back-prop technique.");

Q("w12q5", 12, "MCQ", 3, "cnn",
  "An input image of size 27 × 21 × 3 passes through a convolutional layer with 32 kernels of size 3 × 3 × 3. It is zero-padded by 1 on each side and convolved with stride 2. What is the dimension of the resulting activation map?",
  ["14 × 11 × 32", "13 × 10 × 32", "14 × 11 × 3", "27 × 21 × 32"], 0,
  "Out = ⌊(In − K + 2P)/S⌋ + 1.\nWidth: (27 − 3 + 2)/2 + 1 = 13 + 1 = 14.   Height: (21 − 3 + 2)/2 + 1 = 10 + 1 = 11.   Depth = number of kernels = 32.");

Q("w12q6", 12, "NUM", 3, "cnn",
  "For the same convolutional layer (32 kernels of 3 × 3 × 3 on a 3-channel input), calculate the number of parameters (including biases).",
  null, 896,
  "Parameters = (3 × 3 × 3) × 32 + 32 = 864 + 32 = 896.",
  { tol: 0.5, note: "The printed official solution shows '4864', but 3·3·3·32 + 32 = 896 – and the official answer key says 896." });

Q("w12q7", 12, "NUM", 1, "cnn",
  "Assume the convolutional layer is followed by a MaxPool layer with kernel size 3 × 3 and stride 1. How many learnable parameters does this pooling layer have?",
  null, 0, "A pooling layer has no learnable parameters (0).", { tol: 0.01 });

Q("w12q8", 12, "MCQ", 3, "cnn",
  "A CNN is trained on a 3-class problem (Cat, Dog, Bird). For a Dog image the one-hot label is y = [0, 1, 0]. Label smoothing uses y_smooth = (1 − α)·y + α/K, with α = 0.1 and K = 3. What is the smoothed target vector?",
  ["[0.1000, 0.8000, 0.1000]", "[0.0333, 0.9333, 0.0333]", "[0.0500, 0.9000, 0.0500]", "[0.0000, 0.9000, 0.1000]"], 1,
  "Dog: 0.9·1 + 0.1/3 = 0.9333.  Cat, Bird: 0.9·0 + 0.1/3 = 0.0333.  The vector still sums to 1.");

Q("w12q9", 12, "MCQ", 2, "detect",
  "Which of the following statements is true?",
  ["Fast R-CNN selects fewer region proposals from a given image compared to R-CNN.",
   "In Fast R-CNN, region proposals are prepared from the convolutional feature map of a given image.",
   "R-CNN computes CNN features on the whole input image.",
   "The Region Proposal Network (RPN) is trained to produce region proposals directly after the last convolutional layer in Faster R-CNN."], 3,
  "R-CNN runs the CNN separately on every (selective-search) proposal (c ✗). Fast R-CNN runs the CNN once on the whole image and pools the RoI features, but proposals still come from selective search on the image (b ✗). Faster R-CNN's RPN produces proposals from the last conv feature map (d ✓).");

Q("w12q10", 12, "NUM", 3, "detect",
  "In an object detection problem the time taken to generate all proposals is 0.75. There are 4 proposals generated. What is the inference time of a Faster R-CNN if the convolution time and the time taken by the fully connected layer are 2.25 and 1.75, respectively? (2 decimal places)",
  null, 9.25,
  "Faster R-CNN inference = 1 × ConvTime + NumProposals × fcTime = 2.25 + 4 × 1.75 = 9.25  (the proposals come from the RPN, which shares the convolution – so proposal time is not added separately).", { tol: 0.01 });

/* ====================================================================================
   EXTRA PRACTICE QUESTIONS  (not from the NPTEL assignments – written for revision)
   ==================================================================================== */
const X = { x: true };
function XQ(id, w, t, d, tp, q, o, a, s, tol) { Q(id, w, t, d, tp, q, o, a, s, Object.assign({ x: true }, tol ? { tol } : {})); }

/* ---- image processing / filters ---- */
XQ("x1", 1, "MCQ", 1, "imgproc", "Otsu's method selects the threshold that",
  ["maximises the between-class variance", "minimises the between-class variance", "maximises the within-class variance", "equals the mean grey level of the image"], 0,
  "Otsu: exhaustively search t to maximise σ²_B (equivalently minimise within-class variance). It assumes a roughly bimodal histogram.");
XQ("x2", 1, "MCQ", 1, "filters", "Which filter is best suited to remove salt-and-pepper noise?",
  ["Gaussian filter", "Median filter", "Laplacian filter", "Sobel filter"], 1,
  "A median filter replaces a pixel by the median of its neighbourhood, so isolated extreme values (impulse noise) are discarded while edges stay fairly sharp.");
XQ("x3", 1, "MCQ", 1, "filters", "The Laplacian operator is",
  ["a first-derivative, direction-dependent operator", "a second-derivative, isotropic operator that responds to rapid intensity change", "a low-pass smoothing operator", "a non-linear order-statistic filter"], 1,
  "Laplacian ∇²f = f_xx + f_yy: second derivative, rotation-invariant (isotropic); edges appear as zero-crossings. It amplifies noise, so it is often used with a Gaussian (LoG).");
XQ("x4", 1, "MCQ", 1, "filters", "The convolution theorem states that convolution in the spatial domain corresponds to",
  ["addition in the frequency domain", "multiplication in the frequency domain", "convolution in the frequency domain", "division in the frequency domain"], 1,
  "f * h  ⇄  F(ω)·H(ω). That is why large filters are applied via the FFT.");
XQ("x5", 1, "MCQ", 2, "imgproc", "A 4-bit grey-scale image has how many intensity levels, and what is the maximum value?",
  ["4 levels, max 4", "8 levels, max 8", "16 levels, max 15", "15 levels, max 16"], 2,
  "b bits → 2ᵇ levels, values 0 … 2ᵇ − 1. For b = 4: 16 levels, 0…15.");
XQ("x6", 1, "MCQ", 2, "filters", "Applying a 3×3 box (averaging) filter to an image will",
  ["sharpen edges", "blur the image (low-pass)", "detect vertical edges", "increase contrast"], 1,
  "All weights equal 1/9 → a low-pass filter; it reduces noise but blurs edges.");

/* ---- homography ---- */
XQ("x7", 2, "MCQ", 1, "homog", "A projective transformation (homography) of the plane has how many degrees of freedom?",
  ["6", "7", "8", "9"], 2,
  "3×3 matrix = 9 numbers, minus 1 for the overall scale = 8 DoF. Hence 4 point correspondences are needed.");
XQ("x8", 2, "MSQ", 2, "homog", "Which pairs of transformation and degrees of freedom are correct?",
  ["Euclidean (rotation + translation) – 3", "Similarity – 4", "Affine – 6", "Projective – 9"], [0, 1, 2],
  "Euclidean 3, similarity 4, affine 6, projective 8 (not 9).");
XQ("x9", 2, "MCQ", 2, "homog", "The intersection point of the lines x + y − 2 = 0 and x − y = 0 is (use l₁ × l₂):",
  ["(1, 1)", "(2, 0)", "(0, 2)", "(−1, 1)"], 0,
  "l₁ = (1,1,−2), l₂ = (1,−1,0). l₁ × l₂ = (1·0 − (−2)(−1), (−2)(1) − 1·0, 1·(−1) − 1·1) = (−2, −2, −2) ≅ (1, 1, 1) → (1, 1).");
XQ("x10", 2, "MCQ", 1, "homog", "In homogeneous coordinates, a point (x, y, 0)ᵀ represents",
  ["the origin", "a point at infinity (a direction)", "an invalid point", "the line at infinity"], 1,
  "Points with w = 0 are ideal points (points at infinity). Parallel lines meet at such a point. All of them lie on the line at infinity l∞ = (0,0,1)ᵀ.");
XQ("x11", 2, "MCQ", 2, "homog", "If x′ = Hx maps points, lines (l) transform as",
  ["l′ = H l", "l′ = Hᵀ l", "l′ = H⁻ᵀ l", "l′ = H⁻¹ l"], 2,
  "Incidence lᵀx = 0 must be preserved: l′ᵀx′ = l′ᵀHx = 0 → l′ = H⁻ᵀ l. Conics transform as C′ = H⁻ᵀ C H⁻¹, dual conics as C*′ = H C* Hᵀ.");

/* ---- camera ---- */
XQ("x12", 3, "MCQ", 1, "camera", "Which of the following are INTRINSIC camera parameters?",
  ["rotation R and translation t", "focal length, principal point and skew", "camera centre C", "orientation of the camera"], 1,
  "Intrinsics (matrix K): focal length(s), principal point, skew (and aspect ratio). Extrinsics: R and t (or C).");
XQ("x13", 3, "MCQ", 2, "camera", "A general 3×4 projection matrix P = K[R|t] has how many degrees of freedom?",
  ["9", "10", "11", "12"], 2,
  "K: 5 (fx, fy, skew, px, py), R: 3, t: 3 → 11 (equal to 12 entries minus the scale).");
XQ("x14", 3, "MCQ", 2, "camera", "What is the minimum number of 3D–2D point correspondences needed to estimate P by DLT?",
  ["4", "5.5 → 6", "8", "11"], 1,
  "11 unknowns; every correspondence yields 2 equations → 5.5, so at least 6 points are needed.");
XQ("x15", 3, "MCQ", 2, "camera", "The vanishing point of a family of parallel 3D lines with direction d (in camera coordinates) is",
  ["K d", "K⁻¹ d", "Kᵀ d", "d / ‖d‖ only"], 0,
  "The vanishing point is the image of the point at infinity (d, 0)ᵀ: v = P(d,0)ᵀ = K R d (= K d in camera coordinates).");
XQ("x16", 3, "NUM", 1, "camera", "A pinhole camera with f = 2 (principal point at the origin) views the point (3, 6, 4). What is the x-coordinate of its image?",
  null, 1.5, "x = f·X/Z = 2·3/4 = 1.5.", 0.01);

/* ---- epipolar / stereo ---- */
XQ("x17", 4, "MCQ", 1, "epipolar", "The fundamental matrix F has rank and degrees of freedom of",
  ["rank 3, 9 DoF", "rank 2, 7 DoF", "rank 2, 8 DoF", "rank 3, 8 DoF"], 1,
  "F is 3×3, det F = 0 (rank 2) and defined up to scale → 9 − 1 − 1 = 7 DoF. Min 7 points (7-point algorithm) / 8 points (linear 8-point algorithm).");
XQ("x18", 4, "MCQ", 1, "epipolar", "The epipolar constraint between corresponding points x (left) and x′ (right) is",
  ["x′ = Fx", "x′ᵀ F x = 0", "xᵀ x′ = 0", "F x′ = x"], 1,
  "x′ᵀFx = 0. Fx is the epipolar line in the right image; Fᵀx′ is the epipolar line in the left image.");
XQ("x19", 4, "MCQ", 2, "epipolar", "The essential matrix E (a) needs calibrated cameras, (b) has rank and singular values",
  ["rank 3, three equal singular values", "rank 2, two equal non-zero singular values and one zero", "rank 1", "rank 2, with any two non-zero singular values"], 1,
  "E = [t]ₓR has 5 DoF (3 rotation + 2 for the direction of t up to scale) and singular values (σ, σ, 0). Relation: E = K′ᵀFK.");
XQ("x20", 5, "NUM", 2, "stereo", "A rectified stereo rig has focal length 500 pixels and baseline 0.1 m. A point has disparity 25 pixels. What is its depth in metres?",
  null, 2, "Z = f·B/d = 500 × 0.1 / 25 = 2 m.", 0.01);
XQ("x21", 5, "MCQ", 1, "stereo", "In a rectified stereo pair, as the depth of a point increases its disparity",
  ["increases", "decreases", "stays constant", "becomes negative"], 1,
  "Disparity d = fB/Z is inversely proportional to depth. Near objects have large disparity, far objects small.");
XQ("x22", 5, "MCQ", 1, "stereo", "Image rectification transforms a stereo pair so that",
  ["epipoles lie at the image centre", "epipolar lines become parallel and horizontal (epipoles at infinity), so matches lie on the same scan line", "all depths become equal", "the cameras become uncalibrated"], 1,
  "After rectification, correspondence search reduces from 2D to a 1D search along the same row.");

/* ---- features ---- */
XQ("x23", 6, "MCQ", 1, "features", "The Harris corner detector declares a corner when the structure (second-moment) matrix has",
  ["two small eigenvalues", "one large and one small eigenvalue", "two large eigenvalues", "zero determinant"], 2,
  "Two small eigenvalues → flat region; one large + one small → edge; both large → corner. Harris response R = det(M) − k·trace(M)².");
XQ("x24", 6, "MCQ", 1, "features", "Dimension of a standard SIFT descriptor and of a standard SURF descriptor are respectively",
  ["64 and 128", "128 and 64", "128 and 128", "256 and 64"], 1,
  "SIFT: 4×4 spatial cells × 8 orientation bins = 128. SURF: 4×4 cells × 4 values = 64.");
XQ("x25", 6, "MCQ", 2, "features", "A candidate SIFT keypoint is a local extremum of the DoG scale-space compared with how many neighbours?",
  ["8", "9", "18", "26"], 3,
  "3×3×3 cube: 8 neighbours in the same scale + 9 above + 9 below = 26.");
XQ("x26", 6, "MCQ", 1, "features", "In the Canny edge detector, which step thins the edges to one-pixel width?",
  ["Gaussian smoothing", "Gradient computation", "Non-maximum suppression", "Hysteresis thresholding"], 2,
  "Order: Gaussian smoothing → gradient magnitude & direction → non-maximum suppression (thin ridges) → double-threshold hysteresis (connect strong & weak edges).");
XQ("x27", 6, "MCQ", 2, "features", "Local Binary Patterns (LBP) are invariant to",
  ["any change in image content", "monotonic (gray-scale) illumination changes", "rotation always", "scale changes"], 1,
  "LBP uses only the sign of (neighbour − centre), so any monotonic grey-level transformation leaves the code unchanged. (Basic LBP is not rotation- or scale-invariant.)");
XQ("x28", 6, "MCQ", 2, "features", "The Difference of Gaussians (DoG) used in SIFT approximates",
  ["the gradient", "the scale-normalised Laplacian of Gaussian", "a median filter", "the Hessian determinant only"], 1,
  "DoG = G(kσ) − G(σ) ≈ (k − 1)σ² ∇²G – a cheap approximation of the scale-normalised LoG.");

/* ---- matching & fitting ---- */
XQ("x29", 7, "MCQ", 2, "fitting", "In the Hough transform for lines using the polar form, a point (x, y) maps to the curve",
  ["ρ = x cos θ + y sin θ (a sinusoid in (ρ, θ) space)", "ρ = mx + c", "θ = x + y", "a single point"], 0,
  "Each image point votes for all (ρ, θ) lines through it: ρ = x cosθ + y sinθ. The peak in the accumulator gives the line parameters (avoids the infinite slope problem of y = mx + c).");
XQ("x30", 7, "MCQ", 2, "fitting", "The minimal number of point correspondences (sample size s) used inside RANSAC to fit a line, a homography and a fundamental matrix (8-point) are respectively",
  ["2, 4, 8", "3, 4, 7", "2, 3, 8", "2, 8, 4"], 0,
  "Line 2 points; homography 4 point pairs; fundamental matrix 8 (linear 8-point algorithm; 7 with the 7-point algorithm).");
XQ("x31", 7, "NUM", 2, "fitting", "RANSAC: p = 0.99, outlier ratio e = 0.3, sample size s = 2. How many iterations N are needed? (round up)",
  null, 7, "N = ln(1−p)/ln(1−(1−e)^s) = ln(0.01)/ln(1−0.49) = −4.605/−0.673 = 6.84 → 7.", 0.01);
XQ("x32", 7, "MCQ", 1, "fitting", "Compared with ordinary least squares, RANSAC is",
  ["less robust to outliers", "more robust to outliers, because the model is estimated from inliers only", "identical", "only usable for lines"], 1,
  "Least squares minimises squared error over ALL points, so outliers pull the fit. RANSAC repeatedly fits minimal samples and keeps the model with most inliers.");
XQ("x33", 7, "MCQ", 1, "matching", "For descriptor matching, a good ratio test (Lowe) threshold keeps a match when d₁/d₂ is",
  ["larger than the threshold", "smaller than the threshold", "exactly 1", "greater than 1"], 1,
  "A distinctive match has its nearest neighbour much closer than the second nearest: d₁/d₂ small (e.g. < 0.8 in Lowe's SIFT paper).");
XQ("x34", 7, "MCQ", 1, "matching", "KL divergence D_KL(P‖Q) is",
  ["symmetric and always ≥ 1", "asymmetric, ≥ 0, and 0 only when P = Q", "a true metric distance", "always negative"], 1,
  "D_KL(P‖Q) = Σ p ln(p/q) ≥ 0 (Gibbs' inequality), = 0 iff P = Q; not symmetric and does not satisfy the triangle inequality.");

/* ---- colour ---- */
XQ("x35", 8, "NUM", 2, "color", "In the HSI model a pixel has RGB = (30, 60, 90). What is its saturation S = 1 − min(R,G,B)/I, with I = (R+G+B)/3?",
  null, 0.5, "I = 60, min = 30 → S = 1 − 30/60 = 0.5.", 0.005);
XQ("x36", 8, "MCQ", 1, "color", "The CMY values of the RGB pixel (100, 200, 50) (8-bit) are",
  ["(155, 55, 205)", "(100, 200, 50)", "(0.39, 0.78, 0.2)", "(155, 55, 50)"], 0,
  "C = 255 − R = 155, M = 255 − G = 55, Y = 255 − B = 205.");
XQ("x37", 8, "MCQ", 1, "color", "In a Bayer colour filter array the fraction of green : red : blue samples is",
  ["1/3 each", "1/2 : 1/4 : 1/4", "1/4 : 1/2 : 1/4", "1/4 : 1/4 : 1/2"], 1,
  "RGGB 2×2 tile: two greens, one red, one blue → 50 % G, 25 % R, 25 % B (mimics the eye's higher sensitivity to green).");
XQ("x38", 8, "MCQ", 2, "color", "Chrominance channels (e.g. Cb, Cr) can be sub-sampled (4:2:0) with little visible loss because",
  ["the eye is more sensitive to colour detail than to luminance detail", "the eye is less sensitive to colour detail than to luminance detail", "chrominance has no information", "luminance is always constant"], 1,
  "Human vision has higher spatial acuity for brightness than for colour, so chroma resolution can be reduced to save bits.");
XQ("x39", 8, "MCQ", 2, "color", "Colour correction with the diagonal (von Kries-like) model multiplies each channel by",
  ["the target/source ratio of that channel", "the sum of the three channels", "its inverse transpose", "a rotation matrix"], 0,
  "k_c = target_c / source_c per channel, i.e. a diagonal 3×3 matrix.");

/* ---- range ---- */
XQ("x40", 9, "MCQ", 2, "range", "What is the 3-bit Gray code of stripe number 6 (0-indexed)?",
  ["101", "110", "111", "010"], 0, "g = n XOR (n >> 1): 6 = 110, 110 XOR 011 = 101.");
XQ("x41", 9, "MCQ", 1, "range", "A benefit of Gray-code (rather than plain binary) patterns in structured-light is that",
  ["adjacent codewords differ in only one bit, so decoding errors at stripe boundaries are at most one stripe", "it needs fewer patterns", "it works without a projector", "it gives colour"], 0,
  "A single-bit change between neighbouring stripes limits boundary errors to ±1 stripe.");
XQ("x42", 9, "NUM", 2, "range", "A surface patch has principal curvatures κ₁ = 2 and κ₂ = 3. What is its Gaussian curvature K?",
  null, 6, "K = κ₁κ₂ = 6 (> 0 → elliptic: peak or pit). Mean curvature H = (κ₁ + κ₂)/2 = 2.5.", 0.01);
XQ("x43", 9, "NUM", 2, "range", "For X(u,v) = (u, v, u + v) the first-fundamental-form determinant EG − F² equals",
  null, 3, "X_u = (1,0,1), X_v = (0,1,1): E = 2, F = 1, G = 2 → EG − F² = 4 − 1 = 3.", 0.01);
XQ("x44", 9, "MCQ", 1, "range", "In a range image, each pixel value represents",
  ["colour of the surface", "distance (depth) from the sensor to the surface point", "surface temperature", "the gradient"], 1,
  "Range / depth image: pixel = distance (or Z) of the scene point.");

/* ---- classifiers & NN ---- */
XQ("x45", 10, "MCQ", 1, "classify", "In K-nearest-neighbour classification, increasing K generally",
  ["makes the decision boundary smoother and reduces variance, but may increase bias", "makes the boundary more jagged", "removes the need for a distance metric", "guarantees 100 % accuracy"], 0,
  "K = 1 → very flexible, overfit-prone; large K → smoother boundary, more bias.");
XQ("x46", 10, "MCQ", 1, "classify", "K-means clustering minimises",
  ["between-cluster distance", "the within-cluster sum of squared distances to the centroids", "the number of clusters", "the KL divergence"], 1,
  "K-means alternates assignment & centroid update; it converges to a local minimum of the within-cluster sum of squares and depends on initialisation.");
XQ("x47", 10, "MCQ", 1, "classify", "The Naive Bayes classifier assumes that features are",
  ["linearly dependent", "conditionally independent given the class", "Gaussian with the same mean", "uniformly distributed"], 1,
  "P(x|C) = Π P(xᵢ|C). Decision: argmax_C P(C) Π P(xᵢ|C) (MAP rule).");
XQ("x48", 10, "NUM", 1, "nn", "A neuron has weights w = (1, −1), bias b = 0.5 and ReLU activation. Its output for input x = (2, 1) is",
  null, 1.5, "net = 1·2 − 1·1 + 0.5 = 1.5; ReLU(1.5) = 1.5.", 0.01);
XQ("x49", 10, "NUM", 2, "nn", "Softmax of the logits [2, 1, 0]: the probability of the first class (3 decimals) is",
  null, 0.665, "e² / (e² + e¹ + e⁰) = 7.389 / (7.389 + 2.718 + 1) = 0.665.", 0.002);
XQ("x50", 10, "MCQ", 1, "nn", "Which of the following helps reduce overfitting of a neural network?",
  ["dropout / weight decay / data augmentation", "removing the validation set", "training for many more epochs without monitoring", "using only the training error to stop"], 0,
  "Regularisation methods: dropout, L2 weight decay, data augmentation, early stopping, more data.");

/* ---- PCA / LDA / sparse ---- */
XQ("x51", 11, "MCQ", 1, "dimred", "For a C-class problem, the maximum number of useful Fisher LDA discriminant directions is",
  ["C", "C − 1", "C + 1", "unlimited"], 1,
  "The between-class scatter matrix has rank at most C − 1, hence at most C − 1 non-zero eigen-directions.");
XQ("x52", 11, "NUM", 1, "dimred", "PCA eigenvalues are 10, 5, 3, 2. What percentage of the variance is retained by the first two components?",
  null, 75, "(10 + 5)/(10 + 5 + 3 + 2) = 15/20 = 75 %.", 0.01);
XQ("x53", 11, "MCQ", 2, "dimred", "PCA can be computed from centred data X (n × d) by",
  ["the SVD of X – principal directions are the right singular vectors", "the inverse of X", "sorting pixels", "the determinant of X"], 0,
  "X = UΣVᵀ ⇒ XᵀX/(n−1) = V(Σ²/(n−1))Vᵀ, so columns of V are principal directions and eigenvalues are σᵢ²/(n−1). Eigenfaces = PCA on face images.");
XQ("x54", 11, "MCQ", 1, "dimred", "LDA differs from PCA in that LDA",
  ["is unsupervised and maximises variance", "is supervised and maximises between-class scatter relative to within-class scatter", "does not use eigenvectors", "only works for one class"], 1,
  "Fisher criterion J(w) = (wᵀS_B w)/(wᵀS_W w); solution w ∝ S_W⁻¹(μ₁ − μ₂) for two classes.");
XQ("x55", 11, "MCQ", 2, "sparse", "The ℓ₁ norm is used instead of the ℓ₀ 'norm' in sparse coding because",
  ["ℓ₁ is the number of non-zeros", "ℓ₁ minimisation is a convex relaxation that is computationally tractable (ℓ₀ is NP-hard)", "ℓ₀ is always larger", "ℓ₁ gives dense solutions"], 1,
  "ℓ₀ counts non-zeros (NP-hard to minimise); ℓ₁ (Basis Pursuit / LASSO) promotes sparsity and is convex.");
XQ("x56", 11, "MCQ", 2, "sparse", "Dictionary atoms d₁ = (1,0), d₂ = (0,1), d₃ = (1,1)/√2; signal y = (3,3). With OMP, which atom is selected first?",
  ["d₁", "d₂", "d₃", "all three"], 2,
  "|⟨y,d₁⟩| = 3, |⟨y,d₂⟩| = 3, |⟨y,d₃⟩| = 6/√2 = 4.24 → d₃ is picked, and the residual becomes zero after one atom.");
XQ("x57", 11, "MCQ", 1, "sparse", "K-SVD alternates between",
  ["sparse coding (e.g. OMP) with the dictionary fixed, and dictionary update with the coefficients fixed", "PCA and LDA", "clustering and sorting", "convolution and pooling"], 0,
  "Stage 1: sparse-code all signals with OMP. Stage 2: update atoms one by one via rank-1 SVD of the residual.");

/* ---- CNN / detection ---- */
XQ("x58", 12, "NUM", 1, "cnn", "Input 32×32, kernel 5×5, stride 1, no padding. Output width?",
  null, 28, "(32 − 5 + 0)/1 + 1 = 28.", 0.01);
XQ("x59", 12, "NUM", 2, "cnn", "A conv layer has 16 filters of size 5×5 on a 3-channel input (with bias). Number of parameters?",
  null, 1216, "5·5·3·16 + 16 = 1200 + 16 = 1216.", 0.5);
XQ("x60", 12, "NUM", 1, "cnn", "2×2 max-pooling with stride 2 is applied to a 28×28 feature map. Output width?",
  null, 14, "(28 − 2)/2 + 1 = 14.", 0.01);
XQ("x61", 12, "NUM", 2, "cnn", "Two stacked 3×3 convolutional layers (stride 1) have an effective receptive field of N×N, where N =",
  null, 5, "Receptive field grows by (k − 1) per stride-1 layer: 3 + 2 = 5. (Three layers → 7.)", 0.01);
XQ("x62", 12, "MCQ", 1, "cnn", "A main advantage of ReLU over sigmoid/tanh in deep networks is that it",
  ["saturates for large inputs", "mitigates the vanishing-gradient problem and is cheap to compute", "outputs probabilities", "is differentiable everywhere"], 1,
  "ReLU(x) = max(0,x) has gradient 1 for x > 0 (no saturation) and costs almost nothing to evaluate.");
XQ("x63", 12, "MCQ", 1, "cnn", "A 1×1 convolution is mainly used to",
  ["increase receptive field", "change the number of channels / mix channels at each pixel", "blur the image", "downsample spatially"], 1,
  "1×1 conv = per-pixel fully connected layer across channels – dimensionality reduction (e.g. Inception, ResNet bottleneck).");
XQ("x64", 12, "MCQ", 1, "cnn", "Dropout during training",
  ["randomly sets a fraction of activations to zero to reduce co-adaptation (regularisation)", "doubles the learning rate", "removes the last layer", "increases the number of parameters"], 0,
  "At test time all units are used (with scaling), acting like an ensemble of thinned networks.");
XQ("x65", 12, "NUM", 2, "detect", "Intersection-over-Union of boxes A = (0,0)–(4,4) and B = (2,2)–(6,6) (4 decimals) is",
  null, 0.1429, "Intersection = 2×2 = 4; areas 16 + 16; union = 32 − 4 = 28; IoU = 4/28 = 0.1429.", 0.0005);
XQ("x66", 12, "MCQ", 1, "detect", "Non-maximum suppression in object detection is used to",
  ["remove duplicate overlapping detections of the same object (keep the highest score)", "increase the number of boxes", "train the CNN", "resize the image"], 0,
  "Sort boxes by score; keep the best, discard boxes with IoU above a threshold with it; repeat.");
XQ("x67", 12, "MCQ", 2, "detect", "Order the detectors from slowest to fastest: R-CNN, Fast R-CNN, Faster R-CNN",
  ["R-CNN → Fast R-CNN → Faster R-CNN", "Faster R-CNN → Fast R-CNN → R-CNN", "Fast R-CNN → R-CNN → Faster R-CNN", "all equal"], 0,
  "R-CNN: CNN per proposal (slow). Fast R-CNN: one CNN pass + RoI pooling. Faster R-CNN: RPN replaces selective search (nearly real-time).");
XQ("x68", 12, "NUM", 2, "cnn", "Cross-entropy loss (natural log, 4 decimals) when the predicted probability of the true class is 0.5",
  null, 0.6931, "−ln(0.5) = ln 2 = 0.6931.", 0.0005);

