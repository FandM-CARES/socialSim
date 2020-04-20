import pyhop
from a_start import a_star_search
import sys

# general rules
def hunts(agent1, agent2):
	return agent1[1] == 'hunter' and (agent2[1] == 'stag' or agent2[1] == 'rabbit')


def nearby(state, agent1, agent2):
	return (abs(state.loc[agent1][0] - state.loc[agent2][0]) + abs(state.loc[agent1][1] - state.loc[agent2][1])) < 2


def distance(state, agent1, agent2):
	return abs(state.loc[agent1][0] - state.loc[agent2][0]) + abs(state.loc[agent1][1] - state.loc[agent2][1])


# methods
def simulate_step_forall(state):
	tasks = []
	for agent in state.agents:
		tasks.append(('simulate_step', agent))
	return tasks

# def simulate_step(state):
# 	tasks = []
# 	for agent in state.agents:
# 		if agent is rabbit
# 			tasks.append(('wait', agent))
# 		if agent is hunter
# 			tasks.append(('hunt', agent))
# 			pick target
# 			move towards
# 		if agent is stag
# 			tasks.append(('survive', agent))
# 			if nearby
# 				move away
# 			else
# 				wait
# 	return tasks


def hunt(state, hunter):
	if hunter[1] == 'hunter':
		return [('pick_target', hunter), ('move_towards_target', hunter), ('attempt_capture_target', hunter)]
	else:
		return False
	# target is not known here and can't be provided
	# 2 approaches, 
	#	not have as arg and lookup in state
	# 	have intermediate task


def plan(state, hunter, goal):
	if state.loc[hunter] == goal:
		return [('wait_one', hunter)]
	p = a_star_search(state, hunter, goal, [step_up, step_down, step_left, step_right])
	if p:
		return [(p[0].__name__, hunter)]
	print("no plan", hunter, goal)
	return False

# def plan(state, hunter):
# 	target_loc = state.loc[state.target[hunter]]
# 	queue = []
# 	while queue:
# 		next = queue.pop()
# 		a =
# 	for step in [step_down, step_up, step_left, step_right]:
# 		n = deepcopy(state)
# 		n = step(n, hunter)
# 		if n:
# 			if n.loc[hunter] == target_loc:
# 				return [(step.__name__, hunter)]
# 			else:
# 				return plan(n, hunter)
# 	return False


def mt_target(state, hunter):
	return [('move_towards', hunter, state.loc[state.target[hunter]])]


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
	# TODO need better logic here
	if agent in state.goal and 'cooperateWith' in state.goal[agent]:
		g = state.goal[agent]['cooperateWith']
		if g[0] == agent:
			return [('pick_coop_target', agent, g[1])]
		else:
			return False
	# if agent[0] == 'h1':
	# 	return [('pick_coop_target', agent, ('h2', 'hunter'))]
	# elif agent[0] == 'h2':
	# 	return [('pick_coop_target', agent, ('h1', 'hunter'))]
	else:
		return False


def betray(state, agent):
	# if agent[0] == 'h3':
	# 	return [('pick_closest_target', agent)]
	# else:
	# 	return False
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
		print('move towards up', agent, goal)
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
		for other_agent in state.agents:
			if hunts(other_agent, agent) and \
					state.loc[agent][0] == state.loc[other_agent][0] and \
					state.loc[agent][1]-1 == state.loc[other_agent][1] and \
					enemy != other_agent:
				return False
		return [('step_up', agent)]
	else:
		return False


def move_away_down(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[enemy][1] < state.loc[agent][1]:
		for other_agent in state.agents:
			if hunts(other_agent, agent) and \
					state.loc[agent][0] == state.loc[other_agent][0] and \
					state.loc[agent][1]+1 == state.loc[other_agent][1] and \
					enemy != other_agent:
				return False
		return [('step_down', agent)]
	else:
		return False


def move_away_left(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[enemy][0] > state.loc[agent][0]:
		for other_agent in state.agents:
			if hunts(other_agent, agent) and \
					state.loc[agent][0]-1 == state.loc[other_agent][0] and \
					state.loc[agent][1] == state.loc[other_agent][1] and \
					enemy != other_agent:
				return False
		return [('step_left', agent)]
	else:
		return False


def move_away_right(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[enemy][0] < state.loc[agent][0]:
		for other_agent in state.agents:
			if hunts(other_agent, agent) and \
					state.loc[agent][0]+1 == state.loc[other_agent][0] and \
					state.loc[agent][1] == state.loc[other_agent][1] and \
					enemy != other_agent:
				return False
		return [('step_right', agent)]
	else:
		return False


# evade
def evade_up(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] != state.loc[enemy][0] and state.loc[agent][1] == state.loc[enemy][1]:
		return [('step_up', agent)]
	else:
		return False


def evade_down(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] != state.loc[enemy][0] and state.loc[agent][1] == state.loc[enemy][1]:
		return [('step_down', agent)]
	else:
		return False


def evade_left(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] == state.loc[enemy][0] and state.loc[agent][1] != state.loc[enemy][1]:
		return [('step_left', agent)]
	else:
		return False


def evade_right(state, agent, enemy):
	# if enemy is threat to agent
	if state.loc[agent][0] == state.loc[enemy][0] and state.loc[agent][1] != state.loc[enemy][1]:
		return [('step_right', agent)]
	else:
		return False


def attempt_capture(state, hunter):
	target = state.target[hunter]
	if state.loc[hunter] == state.loc[target]:
		if target[1] == 'stag':
			if hunter in state.goal and 'cooperateWith' in state.goal[hunter] and \
				state.loc[state.goal[hunter]['cooperateWith'][1]] == state.loc[hunter]:
				return [('capture_target', hunter, target)]
			else:
				return []
		else:
			return [('capture_target', hunter, target)]
	else:
		return []


def wait(state, agent):
	return [('wait_one', agent)]


def load_methods(pyhop):
	pyhop.declare_methods('sim_all', simulate_step_forall)
	pyhop.declare_methods('move_away_from', move_away_up, move_away_down, move_away_left, move_away_right, evade_up, evade_down, evade_left, evade_right)
	#pyhop.declare_methods('move_towards', move_towards_up, move_towards_down, move_towards_left, move_towards_right)
	pyhop.declare_methods('move_towards', plan)
	pyhop.declare_methods('simulate_step', hunt, survive, wait)
	pyhop.declare_methods('move_towards_target', mt_target)
	pyhop.declare_methods('pick_target', cooperate, betray)
	pyhop.declare_methods('attempt_capture_target', attempt_capture)
	#pyhop.declare_methods('plan_path', plan)


# operators

def wait_one(state, agent):
	return state


def pick_closest_target(state, agent):
	best = ('', 100000)
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
		if best[1] == 0:
			print('****', agent, best[0], '****')
			print(state.loc)
			#sys.exit(1)
		return state
	else:
		return False


def pick_coop_target(state, agent, other):
	print('PICK COOP', agent, other)
	best = ('', 100000)
	for ptarget in state.agents:
		if hunts(agent, ptarget) and ptarget[1] == 'stag' and ptarget not in state.captured:
			d = distance(state, agent, ptarget) + distance(state, other, ptarget)
			if d < best[1]:
				best = (ptarget, d)
				print(best)
	if best[1] < 100: # arbitrary distance
		state.target[agent] = best[0]
		print('target is', best)
		state.goal[agent]['huntWith'] = (agent, best[0], other)
		return state
	else:
		print('**** failed to pick coop target ****')
		return False


def step_right(state, agent):
	# print('try: step right', agent)
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
	# print('try: step up', agent)
	if state.map[state.loc[agent][0]][state.loc[agent][1]-1] > 0:
		state.loc[agent] = (state.loc[agent][0], state.loc[agent][1]-1)
		return state
	else:
		# print('-fail')
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
def capture_target(state, hunter, target):
	if state.loc[hunter] == state.loc[target] and target not in state.captured:
		if target[1] == 'stag':
			if hunter in state.goal and 'cooperateWith' in state.goal[hunter]:
					teammate = state.goal[hunter]['cooperateWith'][1]
					# check for additional teammate
					if state.goal[teammate]['cooperateWith'][1] == hunter:
						if state.loc[teammate] == state.loc[hunter]:
							print(hunter, state.loc[hunter], 'caught', target, state.loc[target], 'with', teammate)
							state.captured.append(target)
							state.score[hunter] += 5
							state.score[teammate] += 5
						else:
							return False
					else:
						# third party member
						third = state.goal[teammate]['cooperateWith'][1]
						if state.loc[hunter] == state.loc[teammate] and state.loc[teammate] == state.loc[third]:
							print(hunter, state.loc[hunter], 'caught', target, state.loc[target], 'with', teammate, 'and', third)
							state.captured.append(target)
							state.score[hunter] += 5
							state.score[teammate] += 5
							state.score[third] += 5
						else:
							return False
					return state
			else:
				return False
		else:
			print(hunter, state.loc[hunter], 'caught', target, state.loc[target])
			state.captured.append(target)
			state.score[hunter] += 1
			return state
	else:
		return False

#target of opportunity
def load_operators(pyhop):
	pyhop.declare_operators(wait_one, step_right, step_left, step_up, step_down, pick_coop_target, pick_closest_target, capture_target)
