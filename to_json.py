import pickle

def print_rows(rows, indent):
	l = len(rows)
	s = ''
	for i in range(0,l):
		e = '\n' if i == l-1 else ',\n'
		print(' '*indent, rows[i], end=e)



def map_to_json(sim_map):
	print('  "map":[')
	print(',\n'.join(['      '+str(x) for x in sim_map]))
	print('    ],')

def location_to_json(agent, loc):
	return f'        "{agent}":{str(loc).replace("(","[").replace(")","]")}'


def state_to_json(state, num):
	return '    {\n' + \
		',\n'.join(location_to_json(agent[0], state.loc[agent]) for agent in state.loc) + \
		'\n    }'


def sim_to_json(states, sim_id):
	print(f'{{\n  "id":"{sim_id}",') 
	map_to_json(states[0].map)
	print('  "states": [')
	states = ',\n'.join([state_to_json(state, i) for i,state in enumerate(states)])
	print(states)
	print('  ]')
	print('}')

if __name__ == '__main__':
    all_data = pickle.load(open('all.pickle', 'rb'))
    for i, cond1 in enumerate(all_data):
        for j, cond2 in enumerate(cond1):
            for k, cond3 in enumerate(cond2):
                for c, (states, plans) in enumerate(cond3):
                	sim_to_json(states, f'sim-{i}-{j}-{k}-{c}')

