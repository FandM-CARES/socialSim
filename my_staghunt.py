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
        self.add_achieve(sim.my_run_sim, 'my_run_sim')


if __name__ == "__main__":
    logger.setLevel(logging.DEBUG)
    AGENT = StagHuntAgent.parse_command_line_args()

# (achieve :receiver StagHuntAgent :content (task :action (my_run_sim (cons 2 (cons 1 (cons 3 nil))) 3)))
# (achieve :receiver StagHuntAgent :content (task :action (my_run_sim (cons 2 (cons 1 (cons 3 nil))) (cons 3 nil))))

# (achieve :receiver StagHuntAgent :content (task :action (my_make_game (cons 2 (cons 1 (cons 3 nil))))))
# (achieve :receiver StagHuntAgent :content (task :action (my_run_one (state??)))