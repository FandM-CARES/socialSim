import planners.pyhop.pyhop
from copy import deepcopy
import random
import pickle
import staghunt_htn
import print_trace as pt

# maps = [0,1,2,3,4,5,6,7,8,9,10]
#
# maps[0] = [[0, 0, 0, 0, 0, 0, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 1, 0, 0, 0, 1, 0],
#         [0, 1, 0, 1, 0, 1, 0],
#         [0, 1, 0, 1, 0, 1, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 0, 0, 0, 0, 0, 0]]
#
# # scenario from yoshida? paper
# maps[1] = [[0, 0, 0, 0, 0, 0, 0],
#         [0, 0, 0, 1, 0, 0, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 1, 0, 1, 0, 1, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 1, 0, 1, 0, 1, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 0, 0, 1, 0, 0, 0],
#         [0, 0, 0, 0, 0, 0, 0]]
#
# # scenario a from paper
# maps[2] = [[0, 0, 0, 0, 0, 0, 0],
#         [0, 0, 0, 1, 0, 0, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 1, 0, 1, 0, 1, 0],
#         [0, 1, 1, 1, 0, 1, 0],
#         [0, 1, 0, 0, 0, 0, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 0, 0, 1, 0, 0, 0],
#         [0, 0, 0, 0, 0, 0, 0]]
#
# # secnario g from paper
# maps[3] = [[0, 0, 0, 0, 0, 0, 0],
#         [0, 0, 0, 1, 0, 0, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 1, 0, 1, 1, 1, 0],
#         [0, 1, 0, 1, 1, 1, 0],
#         [0, 1, 0, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 0, 0, 1, 0, 0, 0],
#         [0, 0, 0, 0, 0, 0, 0]]
#
# # secnario f from paper
# maps[4] = [[0, 0, 0, 0, 0, 0, 0],
#         [0, 0, 0, 1, 0, 1, 0],
#         [0, 1, 1, 1, 0, 1, 0],
#         [0, 1, 0, 1, 0, 1, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 1, 0, 0, 0, 1, 0],
#         [0, 1, 1, 1, 1, 1, 0],
#         [0, 0, 0, 1, 0, 0, 0],
#         [0, 0, 0, 0, 0, 0, 0]]
#
# maps[5] = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
#         [0, 0, 0, 0, 1, 0, 0, 0, 0],
#         [0, 0, 1, 1, 1, 1, 1, 0, 0],
#         [0, 0, 1, 0, 0, 0, 1, 0, 0],
#         [0, 1, 1, 0, 1, 0, 1, 1, 0],
#         [0, 0, 1, 0, 1, 0, 1, 0, 0],
#         [0, 0, 1, 1, 1, 1, 1, 0, 0],
#         [0, 0, 0, 0, 1, 0, 0, 0, 0],
#         [0, 0, 0, 0, 0, 0, 0, 0, 0]]
#
# # 27 walls
# maps[6] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
#         [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
#         [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
#         [0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0],
#         [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
#         [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0],
#         [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
#
#
# # 0 walls
# maps[8] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
#         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
#
#
# # 33 walls
# maps[9] = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
#         [0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0],
#         [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0],
#         [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
#         [0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
#         [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
#         [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
#         [0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0],
#         [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0],
#         [0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0],
#         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]



###


# 3 walls
map5x5x1 = [[0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0]]

# 8 walls
map5x5x3 = [[0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0]]


# 13 walls
map5x5x5 = [[0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 1, 0, 0],
        [0, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]]


# 5 walls
map7x7x1 = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 0, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]]

# 15 walls
map7x7x3 = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]]


# 25 walls
map7x7x5 = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]]

# 8 walls
map9x9x1 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


# 24 walls
map9x9x3 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


# 40 walls
map9x9x5 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]

maps = [[map5x5x1, map5x5x3, map5x5x5],
        [map7x7x1, map7x7x3, map7x7x5],
        [map9x9x1, map9x9x3, map9x9x5]]

def get_start_state():
    state = planners.pyhop.pyhop.State('init')
    state.agents = [('r1', 'rabbit'), ('r2', 'rabbit'), ('s1', 'stag'), ('s2', 'stag'), ('s3', 'stag'), ('h1', 'hunter'), ('h2', 'hunter'), ('h3', 'hunter')]
    state.loc = {('h1', 'hunter'):(3,5), ('s1', 'stag'):(3,4), ('s2', 'stag'):(1,3), ('s3', 'stag'):(1,2), ('h2', 'hunter'):(3,1), ('h3', 'hunter'):(4,2), ('r1', 'rabbit'):(5,3), ('r2', 'rabbit'):(4,1)}
    # state.map = [[0,0,0,0,0,0,0],
    #              [0,1,1,1,1,1,0],
    #              [0,1,0,0,0,1,0],
    #              [0,1,0,1,0,1,0],
    #              [0,1,0,1,0,1,0],
    #              [0,1,1,1,1,1,0],
    #              [0,0,0,0,0,0,0]]
    state.map = map5x5x3
    state.target = {}
    state.goal = {}
    state.goal[('h2', 'hunter')] = {'cooperateWith': (('h2', 'hunter'), ('h3', 'hunter'))}
    state.goal[('h3', 'hunter')] = {'cooperateWith': (('h3', 'hunter'), ('h2', 'hunter'))}
    state.captured = []
    return state


# conditions
# map size
# map density
# stag quantity
def get_start_state_rand(condition):
    state = planners.pyhop.pyhop.State('init')
    #state.map = map0
    pickMap(state, condition)
    setupAgents(state, condition)
    state.target = {}
    pickGoals(state)
    state.captured = []
    return state

def pickGoals(state):
    c = random.randint(0, 4)
    state.goal = {}
    if c == 0:
        return
    elif c == 1:
        state.goal[('h1', 'hunter')] = {'cooperateWith': (('h1', 'hunter'), ('h2', 'hunter'))}
        state.goal[('h2', 'hunter')] = {'cooperateWith': (('h2', 'hunter'), ('h1', 'hunter'))}
    elif c == 2:
        state.goal[('h1', 'hunter')] = {'cooperateWith': (('h1', 'hunter'), ('h3', 'hunter'))}
        state.goal[('h3', 'hunter')] = {'cooperateWith': (('h3', 'hunter'), ('h1', 'hunter'))}
    elif c == 3:
        state.goal[('h3', 'hunter')] = {'cooperateWith': (('h3', 'hunter'), ('h2', 'hunter'))}
        state.goal[('h2', 'hunter')] = {'cooperateWith': (('h2', 'hunter'), ('h3', 'hunter'))}
    else:
        # 1 working with 2 who is working with 3
        # iow, they are all working together
        state.goal[('h1', 'hunter')] = {'cooperateWith': (('h1', 'hunter'), ('h2', 'hunter'))}
        state.goal[('h2', 'hunter')] = {'cooperateWith': (('h2', 'hunter'), ('h3', 'hunter'))}
        state.goal[('h3', 'hunter')] = {'cooperateWith': (('h3', 'hunter'), ('h1', 'hunter'))}


def pickMap(state, condition):
    #c = random.randint(0, 4)
    #state.map = maps[c]
    state.map = maps[condition[0]][condition[1]]

def setupAgents(state, condition):
    state.agents = [('r1', 'rabbit'), ('r2', 'rabbit')]
    for i in range(0,condition[2]+1):
        state.agents.append((f's{i+1}', 'stag'))
    state.agents.extend([('h1', 'hunter'), ('h2', 'hunter'), ('h3', 'hunter')])

    state.loc = {}
    for agent in state.agents:
        print(agent)
        done = False
        while not done:
            x = random.randint(0,len(state.map)-1)
            y = random.randint(0,len(state.map[0])-1)
            print(x,y)
            if state.map[x][y] > 0:
                done = True
                for other in state.loc:
                    if state.loc[other] == (x,y):
                        done = False
                        break
                if done:
                    state.loc[agent] = (x,y)

def run():
    all_sims = [[[None for i in range(3)] for j in range(3)] for k in range(3)]
    for i in range(0, 3): # map size
        for j in range(0, 3): # map density
            for k in range(0, 3):
                runs_for_cond = []
                for c in range(0, 30):
                    states_plans = run_one((i,j,k))
                    runs_for_cond.append(states_plans)
                all_sims[i][j][k] = runs_for_cond
    pickle.dump(all_sims, open('all.pickle', 'wb'))




def run_one(condition):
    pyhop = planners.pyhop.pyhop.Pyhop('hippity-hop')
    staghunt_htn.load_operators(pyhop)
    staghunt_htn.load_methods(pyhop)
    state = get_start_state_rand(condition)
    #state = get_start_state()
    states = [state]
    plans = []
    pt.print_map(state.map, state.loc)
    for i in range(0, 3):
        plan = pyhop.pyhop(state, [('sim_all',)], verbose=0)
        plans.append(plan)
        pt.print_plan(plan)
        state = deepcopy(state)
        for action in plan:
            fn = pyhop.operators[action[0][0]]
            fn(state, *action[0][1:])
        pt.print_map(state.map, state.loc)
        states.append(state)
    return states, plans

if __name__ == '__main__':
    run()
    #run_one(0)