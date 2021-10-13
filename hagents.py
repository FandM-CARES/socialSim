import sys

INFINITY = sys.maxsize

class Hunter:

    def __init__(self, num, state):
        self.name = ('h' + str(num), 'hunter')
        self.state = state

    def setup(self):
        if self.name not in self.state.agents:
            self.state.agents.append(self.name)
        self.state.score[self.name] = 0
        self.state.hunters[self.name] = self

    def distance(self, agent2):
        if self.name in self.state.loc and agent2 in self.state.loc:
            return abs(self.state.loc[self.name][0] - self.state.loc[agent2][0]) \
                   + abs(self.state.loc[self.name][1] - self.state.loc[agent2][1])
        else:
            return INFINITY


class CompanionsAgent(Hunter):

    def __init__(self, num, state):
        Hunter.__init__(self, num, state)
        self.type = 'Companions'

    def __repr__(self):
        return self.name + '[Comp]'


class ShumAgent(Hunter):

    def __init__(self, num, state):
        Hunter.__init__(self, num, state)
        self.type = 'Shum'

    def __repr__(self):
        return self.name + '[Shum]'


class AStarAgent(Hunter):

    def __init__(self, num, state):
        Hunter.__init__(self, num, state)
        self.type = 'A*'

    def __repr__(self):
        return self.name + '[A*]'

    # FIXME: add actual A* reasoning
    def getGoal(self):
        best = ('', INFINITY)
        for ptarget in self.state.agents:
            if ptarget[1] != 'hunter' and ptarget not in self.state.captured:
                if ptarget[1] == 'rabbit':
                    d = self.distance(ptarget) + 1      # willing to go 1 less steps for less pts
                    other = None
                elif ptarget[1] == 'stag':
                    other, otherDist = self.closestAgent(ptarget)
                    agentDist = self.distance(ptarget)
                    # ensure difference b/w agent to stag and other hunter to stag dist isn't too great
                    if other and (abs(agentDist - otherDist) < 2 or abs(agentDist - otherDist) < agentDist):
                        d = (agentDist + otherDist) // 2
                if d < best[1]:
                    best = (ptarget, d)
                    coopWith = other
        if best[1] < 20:  # arbitrary distance
            if best[0][1] == 'stag':
                self.state.goal[self.name] = {'cooperateWith': (self.name, coopWith, best[0])}
                print('A*', self.name, 'coop goal with', coopWith, 'on', best[0])
            else:
                self.state.goal[self.name] = {'hunt': (self.name, best[0])}
                print('A*', self.name, 'hunt goal on', best[0])

        else:
            return False

    # returns the closest other hunter to ptarget
    def closestAgent(self, ptarget):
        closest = ('', INFINITY)
        for hunter in self.state.hunters:
            if hunter != self.name:
                d = self.state.hunters[hunter].distance(ptarget)
                if d < closest[1]:
                    closest = (hunter, d)
        if closest[1] < 20:
            return closest[0], closest[1]
        else:
            return False
