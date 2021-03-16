import socialSim.pyhop
from socialSim.a_start import a_star_search
import sys

INFINITY = sys.maxsize

# general start state with all the necessary fields, and some necessary values
def get_start_state():
	state = socialSim.pyhop.State('init')
	state.agents = [('r1', 'rabbit'), ('r2', 'rabbit'), ('s1', 'stag'), ('s2', 'stag'), ('s3', 'stag'), ('h1', 'hunter'), ('h2', 'hunter'), ('h3', 'hunter')]
	state.loc = {}		# agent: (x,y)
	state.map = None
	state.target = {}
	state.goal = {}
	state.assumes = {}
	state.captured = []
	state.score = {('h1', 'hunter'):0, ('h2', 'hunter'):0, ('h3', 'hunter'):0}
	state.ready = []
	return state


# general rules
# returns True if agent1 can hunt agent2
def hunts(agent1, agent2):
	return agent1[1] == 'hunter' and (agent2[1] == 'stag' or agent2[1] == 'rabbit')


# returns True if agents 1 and 2 are within 1 manhattan dist away (?)
# in other words, can capture in next move
def nearby(state, agent1, agent2):
	if agent1 in state.loc and agent2 in state.loc:
		return (abs(state.loc[agent1][0] - state.loc[agent2][0]) + abs(state.loc[agent1][1] - state.loc[agent2][1])) < 2
	else:
		return False


# returns manhattan dist between agents 1 and 2
def distance(state, agent1, agent2):
	if agent1 in state.loc and agent2 in state.loc:
		return abs(state.loc[agent1][0] - state.loc[agent2][0]) + abs(state.loc[agent1][1] - state.loc[agent2][1])
	else:
		return INFINITY


# returns True if there is not a hunter at loc in state
def has_no_hunter(state, prey, loc):
	for other_agent in state.agents:
		# for each hunter
		if hunts(other_agent, prey) and \
				loc[0] == state.loc[other_agent][0] and \
				loc[1] == state.loc[other_agent][1] :
			# hunter is immediately to the right
			return False
	return True


###########################################
# methods
###########################################


def simulate_step_forall(state):
	tasks = []		# ("name", agent)
	for agent in state.agents:
		tasks.append(('simulate_agent', agent))		# simulate all agents
	tasks.append(('simulate_game',))
	return tasks


def hunt(state, hunter):
	if hunter[1] == 'hunter':
		return [('pick_target', hunter), ('move_towards_target', hunter)]
	else:
		return False


def plan(state, hunter, goal):
	print('plan', hunter, state.loc[hunter], goal)
	if state.loc[hunter] == goal:
		print('-at goal')
		return [('wait_one', hunter)]
	p = a_star_search(state, hunter, goal, [step_up, step_down, step_left, step_right])
	if p:
		print('-plan to', p[0].__name__)
		return [(p[0].__name__, hunter)]
	print("no plan", hunter, goal)
	return False


def mt_target(state, hunter):
	return [('move_towards', hunter, state.loc[state.target[hunter]])]


# stag evades if there is a hunter within 1 manhatt dist
def survive(state, prey):
	# if prey
	if prey[1] == 'stag':
		for agent in state.agents:
			if agent[1] == 'hunter' and nearby(state, prey, agent):
				return [('move_away_from', prey, agent)]
		return [('wait', prey)]
	else:
		return False


# cooperate or not
def cooperate(state, agent):
	# TODO: need better logic here
	if agent in state.goal and 'cooperateWith' in state.goal[agent]:
		g = state.goal[agent]['cooperateWith']
		if g[0] == agent:
			return [('pick_coop_target', agent, g[1])]
		else:
			return False
	else:
		return False


def betray(state, agent):
	print('betray', agent)
	return [('pick_closest_target', agent)]


# move towards
def move_towards_up(state, agent, goal):
	# if goal is a valid goal of agent
	if state.loc[goal][1] < state.loc[agent][1]:
		print('move towards up', agent, goal)
		return [('step_up', agent)]
	else:
		return False


def move_towards_down(state, agent, goal):
	if state.loc[goal][1] > state.loc[agent][1]:
		print('move towards up', agent, goal)		# aren't these msgs wrong
		return [('step_down', agent)]
	else:
		return False


def move_towards_left(state, agent, goal):
	if state.loc[goal][0] < state.loc[agent][0]:
		print('move towards up', agent, goal)
		return [('step_left', agent)]
	else:
		return False


def move_towards_right(state, agent, goal):
	if state.loc[goal][0] > state.loc[agent][0]:
		print('move towards up', agent, goal)
		return [('step_right', agent)]
	else:
		return False


# move away
def move_away_up(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[enemy][1] > state.loc[agent][1]:
		if has_no_hunter(state, agent, (state.loc[agent][0],state.loc[agent][1]-1)):
			return [('step_up', agent)]
	return False


def move_away_down(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[enemy][1] < state.loc[agent][1]:
		if has_no_hunter(state, agent, (state.loc[agent][0],state.loc[agent][1]+1)):
			return [('step_down', agent)]
	return False


def move_away_left(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[enemy][0] > state.loc[agent][0]:
		if has_no_hunter(state, agent, (state.loc[agent][0]-1,state.loc[agent][1])):
			return [('step_left', agent)]
	return False


def move_away_right(state, agent, enemy):
	# agent is right of enemy
	if state.loc[enemy][0] < state.loc[agent][0]:
		if has_no_hunter(state, agent, (state.loc[agent][0]+1,state.loc[agent][1])):
			return [('step_right', agent)]
	return False

# evade
def evade_up(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] != state.loc[enemy][0] and state.loc[agent][1] == state.loc[enemy][1]:
		if has_no_hunter(state, agent, (state.loc[agent][0],state.loc[agent][1]-1)):
			return [('step_up', agent)]
	return False


def evade_down(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] != state.loc[enemy][0] and state.loc[agent][1] == state.loc[enemy][1]:
		if has_no_hunter(state, agent, (state.loc[agent][0],state.loc[agent][1]+1)):
			return [('step_down', agent)]
	return False


def evade_left(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] == state.loc[enemy][0] and state.loc[agent][1] != state.loc[enemy][1]:
		if has_no_hunter(state, agent, (state.loc[agent][0]-1,state.loc[agent][1])):
			return [('step_left', agent)]
	return False


def evade_right(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] == state.loc[enemy][0] and state.loc[agent][1] != state.loc[enemy][1]:
		if has_no_hunter(state, agent, (state.loc[agent][0]+1,state.loc[agent][1])):
			return [('step_right', agent)]
	return False


def capture_prey(state):
	print('*capture prey*')
	tasks = []
	for agent in state.agents:
		for target in state.agents:
			if hunts(agent, target) and target in state.loc and state.loc[agent] == state.loc[target]:
				tasks.append(('attempt_capture_target', agent))
	return tasks

def attempt_stag_capture(state, hunter):
	for target in state.agents:
		if target[1] == 'stag' and target in state.loc and state.loc[hunter] == state.loc[target]:
			return [('capture_stag', hunter, target)]
	return False

def attempt_rabbit_capture(state, hunter):
	for target in state.agents:
		if target[1] == 'rabbit' and target in state.loc and state.loc[hunter] == state.loc[target]:
			return [('capture_rabbit', hunter, target)]
	return False

def attempt_no_capture(state, hunter):
	return []

def wait(state, agent):
	return [('wait_one', agent)]


def load_methods(pyhop):
	pyhop.declare_methods('sim_all', simulate_step_forall)
	pyhop.declare_methods('move_away_from', move_away_up, move_away_down, move_away_left, move_away_right, evade_up, evade_down, evade_left, evade_right)
	pyhop.declare_methods('move_towards', plan)
	pyhop.declare_methods('simulate_agent', hunt, survive, wait)
	pyhop.declare_methods('simulate_game', capture_prey)
	pyhop.declare_methods('move_towards_target', mt_target)
	pyhop.declare_methods('pick_target', cooperate, betray)
	pyhop.declare_methods('attempt_capture_target', attempt_stag_capture, attempt_rabbit_capture, attempt_no_capture)


###########################################
# operators
###########################################


def wait_one(state, agent):
	return state


def pick_closest_target(state, agent):
	best = ('', INFINITY)
	for ptarget in state.agents:
		if hunts(agent, ptarget) and ptarget[1] == 'rabbit' and ptarget not in state.captured and distance(state, agent, ptarget) < best[1]:
			best = (ptarget, distance(state, agent, ptarget))
	if best[1] < 20: # arbitrary distance
		print('closest target', agent, best)
		state.target[agent] = best[0]
		if agent not in state.goal:
			state.goal[agent] = {}
		# else:
		# 	state.goal[agent]= {'hunt':(agent, best[0])}
		state.goal[agent]['hunt'] = (agent, best[0])
		# picked a target, hunter is now locked and loaded
		if agent not in state.ready:
			state.ready.append(agent)
		if best[1] == 0:
			print('****', agent, best[0], '****')
			print(state.loc)
			#sys.exit(1)
		return state
	else:
		return False


def pick_coop_target(state, agent, other):
	print('PICK COOP', agent, other)
	best = ('', INFINITY)
	for ptarget in state.agents:
		if hunts(agent, ptarget) and ptarget[1] == 'stag' and ptarget not in state.captured:
			# returns infinity if agent not in state i think
			d = distance(state, agent, ptarget) + distance(state, other, ptarget)
			if d < best[1]:
				best = (ptarget, d)
				print(best)	# closest stag to 2 hunters
	if best[1] < 100: # arbitrary distance
		state.target[agent] = best[0]
		print('target is', best)
		state.goal[agent]['huntWith'] = (agent, best[0], other)
		# picked a target, hunter is now locked and loaded
		if agent not in state.ready:
			state.ready.append(agent)
		return state
	else:
		print('**** failed to pick coop target ****')
		return False


def step_right(state, agent):
	# print('try: step right', agent)
	# no wall to the right
	if state.map[state.loc[agent][0]+1][state.loc[agent][1]] > 0:
		state.loc[agent] = (state.loc[agent][0]+1, state.loc[agent][1])
		return state
	else:
		# print('-fail')
		return False


def step_left(state, agent):
	# print('try: step left', agent)
	if state.map[state.loc[agent][0]-1][state.loc[agent][1]] > 0:
		state.loc[agent] = (state.loc[agent][0]-1, state.loc[agent][1])
		return state
	else:
		# print('-fail')
		return False


def step_up(state, agent):
	#print('try: step up', agent)
	if state.map[state.loc[agent][0]][state.loc[agent][1]-1] > 0:
		state.loc[agent] = (state.loc[agent][0], state.loc[agent][1]-1)
		return state
	else:
		#print('-fail')
		return False


def step_down(state, agent):
	# print('try: step down', agent)
	if state.map[state.loc[agent][0]][state.loc[agent][1]+1] > 0:
		state.loc[agent] = (state.loc[agent][0], state.loc[agent][1]+1)
		return state
	else:
		# print('-fail')
		return False

#if stag need cooperator
### REALLY neeed to break this into separate actions
def capture_stag(state, hunter, target):
	print('capturing stag', hunter, target)
	print('ready', state.ready)
	if target[1] == 'stag' and \
		state.loc[hunter] == state.loc[target] and \
		hunter in state.ready and \
		target not in state.captured:
		hunters = [hunter]
		for agent in state.agents:
			if agent != hunter and hunts(agent, target) and \
			 state.loc[agent] == state.loc[target] and agent in state.ready:
				hunters.append(agent)
		print('hunters', hunters)
		if len(hunters) > 1:
			print(hunters, 'caught', target, state.loc[target])
			state.captured.append(target)
			del state.loc[target]
			score = int(6 / len(hunters))
			for h in hunters:
				state.score[h] += score
				state.ready.remove(h)
			return state
		else:
			return False
	else:
		return False
	
		
def capture_rabbit(state, hunter, target):
	if target[1] == 'rabbit' and \
		state.loc[hunter] == state.loc[target] and \
		hunter in state.ready and \
		target not in state.captured:
		print(hunter, state.loc[hunter], 'caught', target, state.loc[target])
		state.captured.append(target)
		del state.loc[target]
		state.score[hunter] += 1
		state.ready.remove(hunter)
		return state
	else:
		return False


def capture_none(state, hunter, target):
	return state


def load_operators(pyhop):
	pyhop.declare_operators(wait_one, step_right, step_left, step_up, step_down, pick_coop_target, pick_closest_target, capture_stag, capture_rabbit, capture_none)
