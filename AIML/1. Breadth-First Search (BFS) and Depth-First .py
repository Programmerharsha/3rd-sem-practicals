Aim: 
To implement state-space search algorithms using Breadth-First Search (BFS) and 
Depth-First Search (DFS) for a basic graph problem. 
Algorithm: 
Step 1: Start the program. 
Step 2: Create a graph using an adjacency list. 
Step 3: Define the starting node as A. 
Step 4: Create a BFS function with graph and start node as inputs. 
Step 5: Initialize an empty visited list for BFS. 
Step 6: Initialize a queue with the starting node. 
Step 7: Remove the first node from the queue. 
Step 8: If the node is not visited, add it to the visited list. 
Step 9: Add all adjacent nodes of the current node to the queue. 
Step 10: Repeat Steps 7 to 9 until the queue becomes empty. 
Step 11: Create a DFS function with graph and start node as inputs. 
Step 12: Initialize an empty visited list and a stack with the starting node. 
Step 13: Remove the last node from the stack. 
Step 14: If the node is not visited, add it to the visited list and add its adjacent nodes to the 
stack in reverse order. 
Step 15: Repeat Steps 13 and 14 until the stack becomes empty, then display the BFS and 
DFS traversal order.


graph = {
'A': ['B', 'C'],
'B': ['D', 'E'],
'C': ['F'],
'D': [],
'E': ['G'],
'F': [],
'G': []
}
def bfs(graph, start):
	visited = []
	queue = [start]
	while queue:
		node = queue.pop(0) 
		if node not in visited:
			visited.append(node)
			queue.extend(graph[node])
	return visited

def dfs(graph, start):
	visited = []
	stack = [start]
	while stack:
		node = stack.pop() 
		if node not in visited:
			visited.append(node)
			stack.extend(reversed(graph[node]))

	return visited

start_node = 'A'
print("Breadth-First Search (BFS):")
print(bfs(graph, start_node))
print("\nDepth-First Search (DFS):")
print(dfs(graph, start_node))
