import pyhop
from copy import deepcopy
import random
import pickle
import models.staghunt_htn
import print_trace as pt

MENTAL_SIM_LEN = 5

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


# conditions
# map size
# map density
# stag quantity
def get_start_state_rand(condition):
    state = models.staghunt_htn.get_start_state()
    pickMap(state, condition)
    setupAgents(state, condition)
    pickRandomGoals(state)
    return state

def pickRandomGoals(state):
    c = random.randint(0, 4)
    assignGoals(state, c)

def assignGoals(state, c):
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

def run_all():
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



def decide(state):
    # sim each set of goals
    sims = []
    for c in range(5):
        print('goal set', c)
        sims.append(deepcopy(state))
        # reset scores for each mental sim
        for agent in sims[c].score:
            sims[c].score[agent] = 0
        assignGoals(sims[c], c)
        print('**** goals ****', sims[c].goal)
        states,_ = simulate_state(sims[c], MENTAL_SIM_LEN)
        sims[c] = states
        print('**** scores ****', sims[c][-1].score)
    # reset goals
    state.goal = {}
    # for each agent, pick best result
    for agent in state.agents:
        if agent[1] == 'hunter':
            s = argmax(range(4), lambda x: sims[x][-1].score[agent])
            print('argmax', s, agent)
            print('-sims score', sims[s][-1].score)
            print('-sims goal', sims[s][0].goal)
            if agent in sims[s][0].goal:
                print('--assigning goal', sims[s][0].goal[agent])
                state.goal[agent] = sims[s][0].goal[agent]
            state.assumes[agent] = sims[s][0].goal


def argmax(args, fn):
    max_val = -1000000
    max_arg = None
    for arg in args:
        val = fn(arg)
        if val > max_val:
            max_val = val
            max_arg = arg
    return max_arg

def run_one(condition):
    state = get_start_state_rand(condition)
    return simulate_state(state, 3, decide)

def simulate_state(state, sim_steps, goal_manager = None):
    planner = pyhop.Pyhop('hippity-hop')
    models.staghunt_htn.load_operators(planner)
    models.staghunt_htn.load_methods(planner)
    states = [state]
    plans = []
    pt.print_map(state.map, state.loc)
    for i in range(0, sim_steps):
        # decisions, decisions.  to decide or not to decide
        if goal_manager:
            goal_manager(state) # side-effects goals
        print('* goals *', state.goal)
        plan = planner.pyhop(state, [('sim_all',)], verbose=0)
        plans.append(plan)
        pt.print_plan(plan)
        state = deepcopy(state)
        for action in plan:
            fn = planner.operators[action[0][0]]
            fn(state, *action[0][1:])
        pt.print_map(state.map, state.loc)
        states.append(state)
    return states, plans

if __name__ == '__main__':
    run_all()
    