Aim: 
To solve the 8-Puzzle Problem using state-space search by representing the initial and 
goal states and finding a sequence of valid moves to reach the goal state. 
Algorithm: 
Step 1: Start 
Step 2: Define the initial state and goal state. 
Step 3: Create an empty queue. 
Step 4: Insert the initial state into the queue. 
Step 5: Create an empty visited list. 
Step 6: Mark the initial state as visited. 
Step 7: Remove a state from the front of the queue. 
Step 8: Check whether the current state is the goal state. 
Step 9: If the goal state is reached, Display the solution and Stop. 
Step 10: Find the position of the blank tile (0). 
Step 11: Generate all possible new states by moving the blank tile Up, Down, Left, or Right. 
Step 12: For each generated state, check whether it is already visited. 
Step 13: If not visited, mark it as visited and insert it into the queue. 
Step 14: Repeat Steps 7 to 13 until the queue becomes empty. 
Step 15: If the queue becomes empty, display "No Solution Found". 
Step 16: Stop.


from collections import deque
goal_state = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 0]
]
def to_tuple(state):
	return tuple(tuple(row) for row in state)

def find_blank(state):
	for i in range(3):
		for j in range(3):
			if state[i][j] == 0:
				return i, j

def get_neighbors(state):
	neighbors = []
	x, y = find_blank(state)
	moves = [(-1, 0), (1, 0), (0, -1), (0, 1)]  
	for dx, dy in moves:
		new_x = x + dx
		new_y = y + dy
		if 0 <= new_x < 3 and 0 <= new_y < 3:
			new_state = [row[:] for row in state]
			new_state[x][y], new_state[new_x][new_y] = \
				new_state[new_x][new_y], new_state[x][y]
			neighbors.append(new_state)
	return neighbors

def solve_puzzle(start_state):
	queue = deque()
	visited = set()
	queue.append((start_state, []))
	visited.add(to_tuple(start_state))
	while queue:
		current_state, path = queue.popleft()

		if current_state == goal_state:
			return path + [current_state]
		for neighbor in get_neighbors(current_state):
			if to_tuple(neighbor) not in visited:
				visited.add(to_tuple(neighbor))
				queue.append((neighbor, path + [current_state]))
	return None

def print_state(state):
	for row in state:
		print(row)
	print()

start_state = [
	[1, 0, 3],
	[4, 2, 6],
	[7, 5, 8]
]
solution = solve_puzzle(start_state)
if solution:
	print("Solution Found")
	print("Number of moves:", len(solution) - 1)
	for step, state in enumerate(solution):
		print("\nStep", step)
		print_state(state)
else:
	print("No solution found.")
