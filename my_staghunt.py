from companionsKQML.pythonian import Pythonian
import socialSim.run_sim as sim
import logging

logger = logging.getLogger('StagHuntAgent')

class StagHuntAgent(Pythonian):

    name = "StagHuntAgent"

    def __init__(self, **kwargs):
        super(StagHuntAgent, self).__init__(**kwargs)
        self.add_achieve(sim.my_make_game, 'my_make_game')
        self.add_achieve(sim.my_run_one, 'my_run_one')


if __name__ == "__main__":
    logger.setLevel(logging.DEBUG)
    AGENT = StagHuntAgent.parse_command_line_args() # kqml AssertionError: Connection formed but output (None) not set.

# (achieve :receiver StagHuntAgent :content (task :action (run_sim (2, 1, 3))))
