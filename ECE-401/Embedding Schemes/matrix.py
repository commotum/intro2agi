import numpy as np

def circular_rotation_matrix(q):
    w, x, y, z = q
    norm_q = np.linalg.norm(q)
    vec_norm = np.linalg.norm([x, y, z])
    
    if vec_norm == 0:
        return np.eye(4)

    theta = np.arccos(w / norm_q)
    sin_theta = np.sin(theta)
    cos_theta = np.cos(theta)
    s = sin_theta / vec_norm

    return np.array([
        [cos_theta, -x * s, -y * s, -z * s],
        [x * s,     cos_theta,  z * s, -y * s],
        [y * s,    -z * s,  cos_theta,  x * s],
        [z * s,     y * s, -x * s,  cos_theta]
    ])

def hyperbolic_rotation_matrix(q):
    w, x, y, z = q
    vec = np.array([x, y, z])
    vec_norm = np.linalg.norm(vec)
    norm_q = np.linalg.norm(q)

    if vec_norm == 0 or norm_q <= 1.0:
        return np.eye(4)

    a, b, c = vec / vec_norm
    phi = np.arccosh(norm_q)
    sinh_phi = np.sinh(phi)
    cosh_phi = np.cosh(phi)

    return np.array([
        [cosh_phi, -a * sinh_phi, -b * sinh_phi, -c * sinh_phi],
        [a * sinh_phi, cosh_phi, c * sinh_phi, -b * sinh_phi],
        [b * sinh_phi, -c * sinh_phi, cosh_phi, a * sinh_phi],
        [c * sinh_phi, b * sinh_phi, -a * sinh_phi, cosh_phi]
    ])

# Input quaternion (unnormalized)
q_input = np.array([0.5, 0.5, 0.5, 0.5])

# Compute matrices from raw input
M_u = circular_rotation_matrix(q_input)
M_h = hyperbolic_rotation_matrix(q_input)
M_combined = M_h @ M_u

# Apply matrices to raw input
qu_out = M_u @ q_input
qh_out = M_h @ q_input
q_combined_out = M_combined @ q_input

# Formatting
fmt = lambda v: ', '.join(f"{x:.3f}" for x in v)

# Output
print(f"q_in         = [{fmt(q_input)}]")
print(f"qu_out       = [{fmt(qu_out)}]")
print(f"qh_out       = [{fmt(qh_out)}]")
print(f"q_combined   = [{fmt(q_combined_out)}]")
