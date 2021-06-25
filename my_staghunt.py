from companionsKQML.pythonian import Pythonian
import companionsKQMLModule as kqml
import run_sim
import logging

logger = logging.getLogger('StagHuntAgent')

class StagHuntAgent(Pythonian):

    name = "StagHuntAgent"
    state = None

    def __init__(self, **kwargs):
        super(StagHuntAgent, self).__init__(**kwargs)
        self.add_achieve(self.make_game, 'make_game')
        self.add_achieve(self.run_one, 'run_one')
        self.add_achieve(self.run_sim, 'run_sim')
        self.add_achieve(self.set_goal, 'set_goal')

    @staticmethod
    def set_goal(hunter, coopWith):
        if not StagHuntAgent.state:
            logger.debug("no game made")
        else:
            hunter = StagHuntAgent.get_hunter(hunter)
            coopWith = StagHuntAgent.get_hunter(coopWith)
            run_sim.my_assignGoals(StagHuntAgent.state, hunter, coopWith)
            StagHuntAgent.state = run_sim.my_run_one(StagHuntAgent.state, False)
            StagHuntAgent.game_end()

    @staticmethod
    def get_hunter(hunter):
        hunter = hunter.to_string()
        hunters = {                     # could be generalized
            'hunter1': ('h1', 'hunter'),
            'hunter2': ('h2', 'hunter'),
            'hunter3': ('h3', 'hunter')
        }
        if hunter in hunters:           # could add check found hunter num actually exists for this game
            return hunters[hunter]
        logger.debug(hunter, 'not found in game')

    @staticmethod
    def make_game(agents):
        StagHuntAgent.state = run_sim.my_make_game(list(map(kqml.convert_to_int, agents)))

    @staticmethod
    def run_one():
        if not StagHuntAgent.state:
            logger.debug("no game made")
        else:
            StagHuntAgent.state = run_sim.my_run_one(StagHuntAgent.state, True)
            StagHuntAgent.game_end()

    @staticmethod
    def run_sim(agents, n):
        run_sim.my_run_sim(list(map(kqml.convert_to_int, agents)), kqml.convert_to_int(n))

    @staticmethod
    def game_end():
        if StagHuntAgent.state.captured:
            print('GAME END')
            print(StagHuntAgent.state.step, 'steps taken')
            scores = StagHuntAgent.state.score.items()
            for hunter in scores:
                print(hunter)
            StagHuntAgent.state = None



if __name__ == "__main__":
    logger.setLevel(logging.DEBUG)
    AGENT = StagHuntAgent.parse_command_line_args()
    AGENT.insert_to_microtheory("session-reasoner", "(distanceBetween hunter2 hunter3 2)", "GameOntologyMt")


# (achieve :receiver StagHuntAgent :content (task :action (run_sim (2 1 3) 1)))

# (achieve :receiver StagHuntAgent :content (task :action (make_game (2 1 3 0))))
# (achieve :receiver StagHuntAgent :content (task :action (set_goal hunter1 hunter2)))
# (achieve :receiver StagHuntAgent :content (task :action (run_one)))
