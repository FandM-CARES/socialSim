from companionsKQML.pythonian import Pythonian
import companionsKQMLModule as kqml
import run_sim
import logging

logger = logging.getLogger('StagHuntAgent')

class StagHuntAgent(Pythonian):

    name = "StagHuntAgent"

    def __init__(self, **kwargs):
        super(StagHuntAgent, self).__init__(**kwargs)
        self.add_achieve(self.make_game, 'make_game')
        self.add_achieve(self.run_one, 'run_one')
        self.add_achieve(self.run_sim, 'run_sim')
        self.add_achieve(self.set_goal, 'set_goal')

    @staticmethod
    def set_goal(hunter, coopWith):
        state = run_sim.my_make_game(list(map(kqml.convert_to_int, (2, 1, 3))))
        run_sim.my_assignGoals(state, ('h1', 'hunter'), ('h2', 'hunter'))
        return run_sim.my_run_one(state, False)

    @staticmethod
    def make_game(agents):
        return run_sim.my_make_game(list(map(kqml.convert_to_int, agents)))

    @staticmethod
    def run_one(state):
        return run_sim.my_run_one(state, False)

    @staticmethod
    def run_sim(agents, n):
        run_sim.my_run_sim(list(map(kqml.convert_to_int, agents)), kqml.convert_to_int(n))


if __name__ == "__main__":
    logger.setLevel(logging.DEBUG)
    AGENT = StagHuntAgent.parse_command_line_args()
    AGENT.insert_to_microtheory("StagHuntAgent", "(distanceBetween hunter1 hunter2 2)", "GameOntologyMt")


# (achieve :receiver StagHuntAgent :content (task :action (run_sim (2 1 3) 1)))

# (achieve :receiver StagHuntAgent :content (task :action (make_game (2 1 3))))
# (achieve :receiver StagHuntAgent :content (task :action (run_one (state??)))
