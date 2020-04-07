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
        for agent in s.agents:
            print(' ', agent[0], s.loc[agent])
        if i < len(plans)-1:
            print_plan(plans[i])


def print_truth(states):
    print('Truth data:')
    for i,s in enumerate(states):
        if i > 0:
            print('state', i)
            for t in s.target:
                print(f'(targeting {t[0]} {s.target[t][0]})')
            for g in s.goal:
                print(f'(goal {g[0]} {s.goal[g]})')


def print_sexpr(states):
    # agents
    for agent in states[0].agents:
        print(f'(isa {agent[0]} {agent[1]})')

    # goals
    for agent in states[0].goal:
        for goal in states[0].goal[agent]:
            args = "".join(f' {a[0]}' for a in states[0].goal[agent][goal])
            print(f'(goal {agent[0]} ({goal}{args}))')

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
            x,y = s.loc[agent]
            print(f'(observesAt x (loc-at {agent[0]} {x} {y}) {i})')


if __name__ == '__main__':
    print_visuals = True
    all = pickle.load(open('all.pickle', 'rb'))
    for i, cond1 in enumerate(all):
        for j, cond2 in enumerate(cond1):
            for k, cond3 in enumerate(cond2):

                print('')
                print('* Simulations for conditions', i, j, k, '*')
                for c, (states, plans) in enumerate(cond3):
                    if print_visuals:
                        print('- Sim run', i, j, k, c, '-')
                        print_trace(states, plans)
                        print_truth(states)
                    else:
                        print(f'(in-simulation {i} {j} {k} {c})')
                        print_sexpr(states)