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