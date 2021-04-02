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

    @staticmethod
    def make_game(agents):
        run_sim.my_make_game(list(map(kqml.convert_to_int, agents)))

    @staticmethod
    def run_one(state):
        run_sim.my_run_one(state)

    @staticmethod
    def run_sim(agents, n):
        run_sim.my_run_sim(list(map(kqml.convert_to_int, agents)), kqml.convert_to_int(n))


if __name__ == "__main__":
    logger.setLevel(logging.DEBUG)
    AGENT = StagHuntAgent.parse_command_line_args()


# (achieve :receiver StagHuntAgent :content (task :action (run_sim (2 1 3) 1)))

# (achieve :receiver StagHuntAgent :content (task :action (make_game (2 1 3))))
# (achieve :receiver StagHuntAgent :content (task :action (run_one (state??)))
