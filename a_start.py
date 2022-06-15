import heapq
from copy import deepcopy


def a_star_search(start, agent, goal, steps):
    frontier = []
    heapq.heappush(frontier, (0, (start, [])))  # (f, (current, path))
    fscores = {}
    gscores = {start.loc[agent]: 0}             # f = g + h

    while len(frontier) > 0:
        n = heapq.heappop(frontier)
        f = n[0]
        current = n[1][0]
        path = n[1][1]

        current_loc = current.loc[agent]
        if current_loc == goal: return path
        if current_loc in fscores: continue

        successors = expand(current, agent, steps)
        fscores[current_loc] = {}
        for next_state, next_step in successors:
            next_loc = next_state.loc[agent]

            temp_g = gscores[current_loc] + 1
            next_f = temp_g + distance(next_loc, goal)
            if next_f < f:
                print("Inconsistent heursitic: f at", current, "is", f, "and child", next, "is", next_f)
            fscores[current_loc][next_loc] = next_f
            if next_loc not in gscores or temp_g < gscores[next_loc]:
                gscores[next_loc] = temp_g
            new_path = list(path)
            new_path.append(next_step)
            heapq.heappush(frontier, (fscores[current_loc][next_loc], (next_state, new_path)))  # update queue


def expand(current, agent, steps):
    expansion = []
    for step in steps:
        n = step(deepcopy(current), agent)
        if n:
            expansion.append((n, step))
    return expansion


def distance(loc1, loc2):
    return abs(loc1[0] - loc2[0]) + abs(loc1[1] - loc2[1])
