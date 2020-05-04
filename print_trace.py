import pickle


def print_map(map, locs):
    print('map:')
    d = [[0 for _ in range(0,len(map))] for _ in range(0, len(map[0]))]
    for x in range(0, len(map)):
        for y in range(0, len(map[x])):
            d[y][x] = ' ' + str(map[x][y])
            for a in locs:
                l = locs[a]
                if l[0] == x and l[1] == y:
                    d[y][x] = a[0]
    for y in d:
        print(''.join(y))


def print_plan(plan):
    print('plan:')
    for p in plan:
        print(p[0])

def print_trace(states, plans):
    print('Trace of states and actions:')
    for i,s in enumerate(states):
        print('state', i)
        print_map(s.map, s.loc)
        # print('loc:')
        for agent in s.agents:
            if agent in s.loc:
                print(' ', agent[0], s.loc[agent])
        # print('targeting:')
        for t in s.target:
            print(f' (targeted {t[0]} {s.target[t][0]})')
        for a in s.score:
            print(f' (score {a[0]} {s.score[a]})')
        # print('goal:')
        # print(s.goal)
        for g in s.goal:
            print(f' (goal {g[0]} {s.goal[g]})')
        for a in s.assumes:
            print(f' (assumes {a[0]} {s.assumes[a]})')
        
        if i < len(plans)-1:
            print_plan(plans[i])


# def print_truth(states):
#     print('Truth data:')
#     for i,s in enumerate(states):
#         if i > 0:
#             print('state', i)
#             for t in s.target:
#                 print(f'(targeting {t[0]} {s.target[t][0]})')
#             for g in s.goal:
#                 print(f'(goal {g[0]} {s.goal[g]})')


def print_sexpr(states):
    # agents
    for agent in states[0].agents:
        print(f'(isa {agent[0]} {agent[1]})')

    # goals
    # for agent in states[0].goal:
    #     for goal in states[0].goal[agent]:
    #         args = "".join(f' {a[0]}' for a in states[0].goal[agent][goal])
    #         print(f'(goal {agent[0]} ({goal}{args}))')

    # maps
    for x in range(0, len(states[0].map)):
        for y in range(0, len(states[0].map[x])):
            if states[0].map[x][y] == 0:
                print(f'(blocked {x} {y})')
            else:
                print(f'(open {x} {y})')

    for i, s in enumerate(states):
        # locations
        for agent in s.agents:
            if agent in s.loc:
                x,y = s.loc[agent]
                print(f'(observesAt x (loc-at {agent[0]} {x} {y}) {i})')
        # goals
        for agent in s.goal:
            for goal in s.goal[agent]:
                args = "".join(f' {a[0]}' for a in s.goal[agent][goal])
                print(f'(goal {agent[0]} ({goal} {args}) {i})')


def calc_stats(base, states):
    prev = None
    for state in states[:-1]:
        numGoals = len(state.goal)
        if numGoals in base['goals']:
            base['goals'][numGoals] += 1
        else:
            base['goals'][numGoals] = 1
        if prev:
            if prev.goal == state.goal:
                base['goalsChanged'][False] += 1
            else:
                base['goalsChanged'][True] += 1
        prev = state
    return base

def print_stats(stats):
    print("stats:")
    print(stats)
    total = 0
    for g in stats['goals']:
        total += stats['goals'][g]
    for g in stats['goals']:
        print(g, float(stats['goals'][g])/total)


if __name__ == '__main__':
    print_visuals = True
    stats = { 'goals':{}, 'goalsChanged':{True:0, False:0}}
    all = pickle.load(open('all.pickle', 'rb'))
    for i, cond1 in enumerate(all):
        for j, cond2 in enumerate(cond1):
            for k, cond3 in enumerate(cond2):
                print('')
                print('* Simulations for conditions', i, j, k, '*')
                for c, (states, plans) in enumerate(cond3):
                    stats = calc_stats(stats, states)
                    if print_visuals:
                        print('- Sim run', i, j, k, c, '-')
                        print_trace(states, plans)
                    else:
                        print(f'(in-simulation {i} {j} {k} {c})')
                        print_sexpr(states)
                    
    print_stats(stats)
