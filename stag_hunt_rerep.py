# from qsr_lib_communicator import QSRLibCommunicator

import math
import pickle
import sys
# sys.path.append('~/Desktop/Research/staghunt-agent/socialSim/qsr')
sys.path.append('C:\\Users\\kliu4\\Desktop\\socialSim\\qsr')
# sys.path.append('/app/companions/pythonian')
from aoc import AOC

class StagHuntRerepAgent(AOC):
    def __init__(self, **kwargs):
        self.name = "StagHuntRerepAgent"  # TODO: possibly need to put this after the super constructor
        super(StagHuntRerepAgent, self).__init__(**kwargs)

        #self.add_asks()
        #self.add_achieves()
        self.add_to_knowledge_converters()
        #self.add_from_knowledge_converters()

        self.cost_map = {'sameSquare': 1, 'closeTo': 3}

    def add_to_knowledge_converters(self):
        #self.add_to_knowledge_converter("intentions", self.get_intention_facts)
        self.add_to_knowledge_converter("argd", self.get_path_distance_argd_facts)
        self.add_to_knowledge_converter("mos", self.get_path_distance_mos_facts)
        self.add_to_knowledge_converter("qtc", self.get_path_distance_qtc_facts)
        self.add_to_knowledge_converter("isas", self.get_isa_facts)
        # self.add_to_knowledge_converter("goals/assumptions", self.get_2o_goals_assumptions)

    def path_distance_dfs(self, stag_map, loc1, loc2, cost=0, visited=list()):
        curr_x, curr_y = loc1
        next_options = [(curr_x + 1, curr_y), (curr_x - 1, curr_y), (curr_x, curr_y + 1), (curr_x, curr_y - 1)]
        if loc1 == loc2:
            return cost
        elif stag_map[curr_x][curr_y] == 0 or loc1 in visited:
            return math.inf
        else:
            visited.append(loc1)
            paths = [self.path_distance_dfs(stag_map, next_loc, loc2, cost + 1, visited) for next_loc in next_options]
            return min(paths)

    def get_path_distance_argd_facts(self, states):
        stag_map = states[0].map
        agent_pairs = []
        # get agent tuples
        for a1 in states[0].agents:  # all states should have the same agents
            for a2 in states[0].agents:
                # ignore prey-prey relations
                if a1[1] in ['rabbit', 'stag'] and a2[1] in ['rabbit', 'stag']:
                    continue
                # avoid repeats
                if a1 != a2 and (a2, a1) not in agent_pairs:
                    agent_pairs.append((a1, a2))

        facts = []
        for i, state in enumerate(states):
            for a1, a2 in agent_pairs:
                if not a1 in state.loc:
                    fact = f'ist-Information {self.microtheory} (observesAt {self.name} (captured {a1})))'
                    continue
                elif not a2 in state.loc:
                    fact = f'ist-Information {self.microtheory} (observesAt {self.name} (captured {a2})))'
                else:
                    loc1 = state.loc[a1]
                    loc2 = state.loc[a2]
                    path_distance = self.path_distance_dfs(stag_map, loc1, loc2, 0, [])
                    path_pred = 'sameSquare' if path_distance < self.cost_map['sameSquare'] else 'closeTo' if \
                        path_distance < self.cost_map['closeTo'] else 'farFrom'
                    if a1[1] == 'hunter' and a2[1] == 'hunter':
                        path_pred = path_pred + "-Agent"
                    if i == 0:
                        fact = f"(holdsAtStart step1 ({path_pred} {a1[0]} {a2[0]}))"
                    else:
                        fact = f"(holdsAtEnd step{i} ({path_pred} {a1[0]} {a2[0]}))"
                facts.append(fact)
        return facts

    def get_path_distance_qtc_facts(self, states):
        stag_map = states[0].map
        agent_pairs = []
        # get agent tuples
        for a1 in states[0].agents:  # all states should have the same agents
            for a2 in states[0].agents:
                # ignore prey-prey relations
                if a1 == a2 or (a1[1] in ['rabbit', 'stag'] and a2[1] in ['rabbit', 'stag']):
                    continue
                else: agent_pairs.append((a1, a2))

        facts = []
        for i, state in enumerate(states):
            if i == 0:
                prev_state = state
                continue
            else:
                for a1, a2 in agent_pairs:
                    if a1 in state.loc and a2 in state.loc:
                        loc1_curr = state.loc[a1]
                        loc2_prev = prev_state.loc[a2]
                        loc1_prev = prev_state.loc[a1]

                        path_distance_from_curr = self.path_distance_dfs(stag_map, loc1_curr, loc2_prev, 0, [])
                        path_distance_from_prev = self.path_distance_dfs(stag_map, loc1_prev, loc2_prev, 0, [])
                        path_pred = 'approaches' if path_distance_from_curr < path_distance_from_prev else 'distances' \
                                    if path_distance_from_curr > path_distance_from_prev else None # else means agent is stationary, which should be covered by mos

                        if path_pred:
                            if a1[1] == 'hunter' and a2[1] == 'hunter':
                                path_pred = path_pred + "-Agent"
                            fact = f"(holdsIn step{i} ({path_pred} {a1[0]} {a2[0]}))"
                            facts.append(fact)
                prev_state = state
        return facts

    def get_path_distance_mos_facts(self, states):
        facts = []
        for i, state in enumerate(states):
            if i == 0:
                prev_state = state
                continue
            else:
                for agent in state.agents:
                    if agent in state.loc:
                        loc1_curr = state.loc[agent]
                        loc1_prev = prev_state.loc[agent]

                        path_pred = 'stationary' if loc1_curr == loc1_prev else 'moving'

                        fact = f"(holdsIn step{i} ({path_pred} {agent[0]}))"
                        facts.append(fact)
            prev_state = state
        return facts

    def get_intention_facts(self, states):
        truths = list()
        for i, s in enumerate(states):
            if i > 0:
                for t in s.target:
                    truths.append(f'(in-state {i} (targeting {t[0]} {s.target[t][0]}))')
                for g in s.goal:
                    if "cooperateWith" in s.goal[g].keys():
                        coop_fact = f'(in-state {i} (goal {g[0]} (cooperateWith {s.goal[g]["cooperateWith"][0][0]} ' \
                                    f'{s.goal[g]["cooperateWith"][1][0]})))'
                        hunt_fact = f'(in-state {i} (goal {g[0]} (huntWith {s.goal[g]["huntWith"][0][0]} ' \
                                    f'{s.goal[g]["huntWith"][2][0]} {s.goal[g]["huntWith"][1][0]})))'
                        truths.append(coop_fact)
                        truths.append(hunt_fact)

        return truths

    def get_2o_goals_assumptions(self, states):
        facts = list()
        for i, s in enumerate(states):
            if i>0:

                for agent in s.agents:
                    agent_name = agent[0]
                    agent_type = agent[1]
                    if agent_type =='hunter':

                        # goals
                        if agent in s.goal and 'cooperateWith' in s.goal[agent]:
                            goal = s.goal[agent]
                            coop_fact = self.generate_coop_fact(goal)
                            goal_fact = f'(in-state {i} (actualGoal {agent_name} {coop_fact}))'
                        else:
                            goal_fact = f'(in-state {i} (actualGoal {agent_name} (huntAlone {agent_name})))'
                        facts.append(goal_fact)

                        #assumptions
                        if agent in s.assumes:
                            assumption = s.assumes[agent]
                            for agent2 in s.agents:
                                a2_name = agent2[0]
                                a2_type = agent2[1]
                                if agent2 in assumption:
                                    coop_assumption = self.generate_coop_fact(assumption[agent2])
                                    assume_fact = f'(in-state {i} (assumes {agent_name} ' \
                                                  f'(assumedGoal {a2_name} {coop_assumption})))'
                                elif a2_type == 'hunter':
                                    assume_fact = f'(in-state {i} (assumes {agent_name} ' \
                                                  f'(assumedGoal {a2_name} (huntAlone {a2_name}))))'
                                else:
                                    continue
                                facts.append(assume_fact)
        return facts

    def generate_coop_fact(self, goal):
        a1 = goal['cooperateWith'][0][0]
        a2 = goal['cooperateWith'][1][0]
        fact = f'(cooperateWith {a1} {a2})'
        if len(goal['cooperateWith']) >2:
            print(goal['cooperateWith'])
        return fact


                        

    def get_isa_facts(self, states):
        facts = list()
        for agent, type in states[0].agents:
            fact = f'(isa {agent} {type.capitalize()})'
            facts.append(fact)
        return facts

    # def get_truth(self, states):
    #     truths = list()
    #     for i, s in enumerate(states):
    #         if i > 0:
    #             for t in s.target:
    #                 truths.append(f'(in-state {i} (targeting {t[0]} {s.target[t][0]}))')
    #             for g in s.goal:
    #                 if "cooperateWith" in s.goal[g].keys():
    #                     coop_fact = f'(in-state {i} (goal {g[0]} (cooperateWith {s.goal[g]["cooperateWith"][0][0]} ' \
    #                                 f'{s.goal[g]["cooperateWith"][1][0]})))'
    #                     hunt_fact = f'(in-state {i} (goal {g[0]} (huntWith {s.goal[g]["huntWith"][0][0]} ' \
    #                                 f'{s.goal[g]["huntWith"][2][0]} {s.goal[g]["huntWith"][1][0]})))'
    #                     truths.append(coop_fact)
    #                     truths.append(hunt_fact)
    #                 else:
    #                     hunt_fact = f'(in-state {i} (goal {g[0]} (huntAlone {s.goal[g]["hunt"][0][0]} ' \
    #                                 f'{s.goal[g]["hunt"][1][0]})))'
    #                     truths.append(hunt_fact)
    #     return truths

def insert_mt_to_file(file, mt, facts):
    with open(file, "w") as f:
        f.write(f'(in-microtheory {mt})')
        f.write(f'(genlMt {mt} StagHuntPrelimCollectorMt)') # TODO: not collector, but something else?
        for fact in facts:
            f.write("\n")
            f.write(fact)

def insert_ground_truths_to_file():
    # all = pickle.load(open('/app/companions/pythonian/new-folder/all.pickle', 'rb'))
    all = pickle.load(open('~/Desktop/Research/staghunt-agent/socialSim/all.pickle', 'rb'))
    file ="~/Desktop/Research/staghunt-agent/socialSim/qsr/stag-hunt-truths.krf"

    rerep = StagHuntRerepAgent()

    with open(file, 'w+') as f:
        f.write('(in-microtheory StagHuntGroundTruthMt)\n')

    for i, cond1 in enumerate(all):
        for j, cond2 in enumerate(cond1):
            for k, cond3 in enumerate(cond2):
                for c, (states, plans) in enumerate(cond3):
                    with open(file,'a+') as f:
                        for line in rerep.get_truth(states):
                            f.write(f'(for-mt (StagHuntMt {i} {j} {k} {c}) {line})\n')

    print('done')

def test():
    # all = pickle.load(open('/app/companions/pythonian/new-folder/all.pickle', 'rb'))
    all = pickle.load(open('./all.pickle', 'rb'))
    # dir = "/app/companions/pythonian/new-folder/qsr"
    dir = "~/Desktop/Research/staghunt-agent/socialSim/qsr"

    rerep = StagHuntRerepAgent()

    for i, cond1 in enumerate(all):
        for j, cond2 in enumerate(cond1):
            for k, cond3 in enumerate(cond2):

                for c, (states, plans) in enumerate(cond3):
                    rerep.microtheory = f'(StagHuntMt {i} {j} {k} {c})'
                    facts = rerep.convert_to_knowledge(states)
                    f_name = f'stag-hunt-qsrs-map-{i}-{j}-{k}-{c}.krf'
                    insert_mt_to_file(f_name, rerep.microtheory, facts)

    print('done')



def qualify(game, mt):
    rerep = StagHuntRerepAgent()
    rerep.microtheory = mt
    return rerep.convert_to_knowledge(game)
