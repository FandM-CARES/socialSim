import pickle
import csv
import sys
import pandas

h1 = ('h1', 'hunter')
h2 = ('h2', 'hunter')
h3 = ('h3', 'hunter')

def degrees_of_freedom(a, state):
	c = 0 # count
	x,y = state.loc[a]
	# up
	if state.map[x][y-1] != 0: c = c + 1
	# down
	if state.map[x][y+1] != 0: c = c + 1
	# left
	if state.map[x-1][y] != 0: c = c + 1
	# right
	if state.map[x+1][y] != 0: c = c + 1
	return c

def distance_between_agents(ax, ay, state):
	return abs(state.loc[ax][0] - state.loc[ay][0]) + abs(state.loc[ax][1] - state.loc[ay][1])

def sum_distance_to_closest_stag(hx, hy, state):
	min_dist = 100
	closest_stag = None
	for agent in state.loc:
		if agent[1] == 'stag':
			d1 = distance_between_agents(hx,agent,state)
			d2 = distance_between_agents(hy,agent,state)
			d = d1+d2
			if d < min_dist:
				min_dist = d
				closest_stag = agent
	# if min_dist == 100:
	# 	print(state.loc)
	# 	sys.exit()
	return min_dist

def is_collaborating_agents(hx, hy, state):
	goal1 = 0
	goal2 = 0
	if hx in state.goal and 'cooperateWith' in state.goal[hx] and \
	state.goal[hx]['cooperateWith'][0] == hx and \
	state.goal[hx]['cooperateWith'][1] == hy:
		goal1 = 0.5
	if hy in state.goal and 'cooperateWith' in state.goal[hy] and \
	state.goal[hy]['cooperateWith'][0] == hy and \
	state.goal[hy]['cooperateWith'][1] == hx:
		goal2 = 0.5
	return goal1 + goal2

def process_pair(hx, hy, state):
	d12 = distance_between_agents(hx, hy, state)
	d12s = sum_distance_to_closest_stag(hx, hy, state)
	collab12 = is_collaborating_agents(hx, hy, state)
	return (d12, d12s, collab12)

def write_to_csv():
	with open('dist_stats.csv', 'w') as csvfile:
		csvwriter = csv.writer(csvfile)
		csvwriter.writerow(['cond1','cond2','cond3','sim','state','dof','d_agents','d_stag','collab'])
		all_data = pickle.load(open('all.pickle', 'rb'))
		for i, cond1 in enumerate(all_data):
			for j, cond2 in enumerate(cond1):
				for k, cond3 in enumerate(cond2):
					for c, (states, plans) in enumerate(cond3):
						for s, state in enumerate(states):
							if s != 3:
								dof = sum([degrees_of_freedom(a, state) for a in (h1,h2,h3)])
								for pair in [(h1,h2), (h2,h3), (h1,h3)]:
									d = process_pair(pair[0], pair[1], state)
									row = [i,j,k,c,s,dof,d[0],d[1],d[2]]
									print(row)
									csvwriter.writerow(row)

def read_from_csv():
	df = pandas.read_csv('dist_stats.csv')
	return df

if __name__ == '__main__':
	#write_to_csv()
	df = read_from_csv()
	filteredf = df[df['d_stag']<100]
	x = filteredf[['dof','d_agents','d_stag','collab']].corr()
	print(x)
	# dof median
	median = df[['dof']].median()['dof']
	print(median)
	less = filteredf[filteredf['dof']<=median]
	x = less[['dof','d_agents','d_stag','collab']].corr()
	print(x)
	greater = filteredf[filteredf['dof']>median]
	y = greater[['dof','d_agents','d_stag','collab']].corr()
	print(y)
	