Aim:  
To design and implement the A* Search algorithm using a suitable heuristic function 
to find the optimal path from a start node to a goal node. 
Algorithm: 
Step 1: Start. 
Step 2: Define the graph with nodes, edges, and their corresponding path costs. 
Step 3: Define the heuristic value h(n) for each node. 
Step 4: Insert the start node into the priority queue (OPEN list) with its f(n) value. 
Step 5: Remove the node having the smallest f(n) value from the priority queue. 
Step 6: If the selected node is the goal node, display the optimal path and total cost, then stop. 
Step 7: Otherwise, mark the selected node as visited. 
Step 8: Generate all neighboring nodes of the current node. 
Step 9: For each neighboring node, calculate: 
g(n) = Actual cost from the start node. 
h(n) = Heuristic estimate to the goal. 
f(n)=g(n)+h(n). 
Step 10: Insert the neighboring nodes into the priority queue according to their f(n) values. 
Step 11: Repeat Steps 5–10 until the goal node is reached or no path exists. 
Step 12: Stop.

import heapq

graph = {
    'A': [('B', 2), ('C', 4)],
    'B': [('D', 7), ('E', 3)],
    'C': [('F', 2)],
    'D': [('G', 1)],
    'E': [('G', 5)],
    'F': [('G', 3)],
    'G': []
}

heuristic = {
    'A': 9,
    'B': 8,
    'C': 5,
    'D': 1,
    'E': 5,
    'F': 3,
    'G': 0
}

def astar(start, goal):
    queue = []
    heapq.heappush(queue, (heuristic[start], 0, start, [start]))
    visited = []
    
    while queue:
        f, g, current, path = heapq.heappop(queue)
        
        if current in visited:
            continue
            
        print("Current Node :", current)
        print("g(n) =", g)
        print("h(n) =", heuristic[current])
        print("f(n) =", f)
        print()
        
        visited.append(current)
        
        if current == goal:
            return path, g
            
        for neighbor, cost in graph[current]:
            if neighbor not in visited:
                new_g = g + cost
                new_f = new_g + heuristic[neighbor]
                heapq.heappush(queue, (new_f, new_g, neighbor, path + [neighbor]))
                
    return None, None

start = 'A'
goal = 'G'
path, cost = astar(start, goal)

print("-------------------------")
if path:
    print("Optimal Path :", " -> ".join(path))
    print("Total Cost   :", cost)
else:
    print("No path found.")
