function dijkstra(graph, start) {
    // Initialize distances with Infinity for all vertices except start
    let distances = {};
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Priority queue to store vertices with their current shortest distance
    let priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
        let currentVertex = priorityQueue.dequeue().element;

        // Iterate through adjacent vertices of the current vertex
        for (let neighbor in graph[currentVertex]) {
            // Calculate new distance for the neighbor
            let distance = distances[currentVertex] + graph[currentVertex][neighbor];

            // If new distance is shorter, update distances and enqueue neighbor
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                priorityQueue.enqueue(neighbor, distance);
            }
        }
    }

    return distances;
}

// Priority Queue implementation (Min Binary Heap)
class PriorityQueue {
    constructor() {
        this.items = [];
    }

    enqueue(element, priority) {
        let queueElement = { element, priority };
        let added = false;
        for (let i = 0; i < this.items.length; i++) {
            if (queueElement.priority < this.items[i].priority) {
                this.items.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }
        if (!added) {
            this.items.push(queueElement);
        }
    }

    dequeue() {
        return this.items.shift();
    }

    isEmpty() {
        return this.items.length === 0;
    }
}

// Example usage
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A'));
