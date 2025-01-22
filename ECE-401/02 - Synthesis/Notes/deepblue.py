# Piece values (material balance)
PIECE_VALUES = {
    'P': 1,     # White Pawn
    'N': 3,     # White Knight
    'B': 3.1,   # White Bishop
    'R': 5,     # White Rook
    'Q': 9,     # White Queen
    'K': 0,     # White King (not scored directly)
    'k': 0,     # Black King
    'q': -9,    # Black Queen
    'r': -5,    # Black Rook
    'b': -3.1,  # Black Bishop
    'n': -3,    # Black Knight
    'p': -1     # Black Pawn
}

# Central squares on the board
CENTER_SQUARES = ['d4', 'e4', 'd5', 'e5']

# Positional multipliers
PAWN_STRUCTURE_BONUS = 0.5
KING_SAFETY_PENALTY = -2
PIECE_ACTIVITY_BONUS = 0.1
CENTER_CONTROL_BONUS = 0.2

def is_isolated_pawn(pawn, board):
    """Check if a pawn is isolated (no supporting pawns on adjacent files)."""
    file = pawn.position[0]  # Get the file (e.g., 'a', 'b', ...)
    adjacent_files = [chr(ord(file) - 1), chr(ord(file) + 1)]  # Adjacent files
    for adj_file in adjacent_files:
        for rank in range(1, 9):  # Check all ranks
            adj_square = f"{adj_file}{rank}"
            adj_piece = board.get_piece_on(adj_square)
            if adj_piece and adj_piece.symbol().lower() == 'p' and adj_piece.color == pawn.color:
                return False  # Found a supporting pawn
    return True

def calculate_activity(piece, board):
    """Calculate the mobility (number of legal moves) for a piece."""
    return len(piece.legal_moves(board))

def is_exposed_king(king, board):
    """Check if a king is exposed (weak pawn cover or under attack)."""
    king_square = king.position
    adjacent_squares = board.get_adjacent_squares(king_square)
    pawn_cover = sum(
        1 for square in adjacent_squares
        if board.get_piece_on(square) and board.get_piece_on(square).symbol().lower() == 'p'
    )
    return pawn_cover < 2 or board.is_square_attacked(king_square, not king.color)

def control_of_center(board):
    """Evaluate control of the central squares."""
    score = 0
    for square in CENTER_SQUARES:
        piece = board.get_piece_on(square)
        if piece:
            score += CENTER_CONTROL_BONUS if piece.color == 'white' else -CENTER_CONTROL_BONUS
    return score

def evaluate_position(board):
    """
    Evaluates the chess board position and returns a score as a human-readable string.
    Example: 'Advantage White: 3.5' or 'Advantage Black: 2.1'
    """

    # Initialize evaluation score
    score = 0

    # Iterate through all squares on the board
    for square in board.squares:
        piece = square.piece
        if piece:
            # Material value
            score += PIECE_VALUES[piece.symbol()]

            # Positional bonuses
            if piece.symbol().lower() == 'p':  # Pawn-specific logic
                if is_isolated_pawn(piece, board):
                    score += PAWN_STRUCTURE_BONUS if piece.color == 'white' else -PAWN_STRUCTURE_BONUS
            if piece.symbol().lower() in ['q', 'r', 'b', 'n']:  # Active pieces
                activity = calculate_activity(piece, board)
                score += activity * PIECE_ACTIVITY_BONUS if piece.color == 'white' else -activity * PIECE_ACTIVITY_BONUS
            if piece.symbol().lower() == 'k':  # King-specific logic
                if is_exposed_king(piece, board):
                    score += KING_SAFETY_PENALTY if piece.color == 'white' else -KING_SAFETY_PENALTY

    # Add central control score
    score += control_of_center(board)

    # Return formatted result
    if score > 0:
        return f"Advantage White: {score:.2f}"
    elif score < 0:
        return f"Advantage Black: {-score:.2f}"  # Return as positive for readability
    else:
        return "Even Position"
