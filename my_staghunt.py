from companionsKQML.pythonian import Pythonian
import companionsKQMLModule as kqml
import run_sim
import stag_hunt_rerep
import logging


logger = logging.getLogger('StagHuntAgent')

class StagHuntAgent(Pythonian):

    name = "StagHuntAgent"
    state = None
    game = []
    self = None
    shum = None     # if shum game, set to game letter
    comp_agent = None

    def __init__(self, **kwargs):
        super(StagHuntAgent, self).__init__(**kwargs)
        self.add_achieve(self.make_game, 'make_game')
        self.add_achieve(self.make_shum_game, 'make_shum_game')
        self.add_achieve(self.run_one, 'run_one')
        self.add_achieve(self.run_shum_one, 'run_shum_one')
        self.add_achieve(self.run_sim, 'run_sim')
        self.add_achieve(self.set_goal, 'set_goal')
        self.add_achieve(self.set_astar_goals, 'set_astar_goals')
        self.add_achieve(self.rerep, 'rerep')

    @staticmethod
    def set_goal(hunter, coopWith, target):
        if not StagHuntAgent.state:
            logger.debug("no game made")
            return
        hunter = StagHuntAgent.get_agent(hunter)
        target = StagHuntAgent.get_agent(target)
        if StagHuntAgent.shum and StagHuntAgent.state.hunters[hunter].type != 'Companions':
            logger.debug("passed hunter is not companions agent")
            return
        if kqml.convert_to_boolean(coopWith):
            coopWith = StagHuntAgent.get_agent(coopWith)
        else:
            coopWith = False
        if hunter and target:
            run_sim.my_assignGoals(StagHuntAgent.state, hunter, target, coopWith)

    @staticmethod
    def set_astar_goals():
        if not StagHuntAgent.state:
            logger.debug("no game made")
        else:
            hunters = StagHuntAgent.state.hunters.values()
            for hunter in hunters:
                if (not StagHuntAgent.shum and hunter.type == 'A*') or \
                        (StagHuntAgent.shum and hunter.type == 'Shum'):
                    hunter.getGoal()


    @staticmethod
    def get_agent(token):
        agent = token.to_string()
        for type in ('rabbit', 'stag', 'hunter'):
            if type in agent:
                name = type[0] + agent[-1]
                agent = (name, type)
                break
        if agent in StagHuntAgent.state.agents:
            return agent
        else:
            logger.debug(agent + ' not found in game')
            return False

    @staticmethod
    def make_game(agents):
        StagHuntAgent.state = run_sim.my_make_game(list(map(kqml.convert_to_int, agents)))
        StagHuntAgent.game = [StagHuntAgent.state]
        StagHuntAgent.shum = None
        StagHuntAgent.comp_agent = None

    @staticmethod
    def make_shum_game(game, comp_agent):
        StagHuntAgent.state = run_sim.setup_shum_game(game.to_string(), kqml.convert_to_int(comp_agent))
        StagHuntAgent.game = [StagHuntAgent.state]
        StagHuntAgent.shum = game.to_string()

    @staticmethod
    def run_one(randGoals):
        if not StagHuntAgent.state:
            logger.debug("no game made")
        elif StagHuntAgent.shum:
            logger.debug("made game is shum")
        else:
            next = run_sim.my_run_one(StagHuntAgent.state, kqml.convert_to_boolean(randGoals))
            if next:
                next.goal.clear()
                StagHuntAgent.state = next
                StagHuntAgent.game.append(next)
                StagHuntAgent.game_end()

    @staticmethod
    def run_shum_one():
        if not StagHuntAgent.state:
            logger.debug("no game made")
        elif not StagHuntAgent.shum:
            logger.debug("made game is not shum")
        else:
            next = run_sim.shum_run_one(StagHuntAgent.shum, StagHuntAgent.state)
            if not next:
                logger.debug("error in running next step")
            next.goal.clear()
            StagHuntAgent.state = next
            StagHuntAgent.game.append(next)
            StagHuntAgent.game_end()

    @staticmethod
    def run_sim(agents, n):
        run_sim.my_run_sim(list(map(kqml.convert_to_int, agents)), kqml.convert_to_int(n))

    @staticmethod
    def game_end():
        if not StagHuntAgent.state.captured:
            return
        print('GAME END')
        print(StagHuntAgent.state.step, 'steps taken')
        scores = StagHuntAgent.state.score.items()
        for hunter in scores:
            print(hunter)
        StagHuntAgent.state = None

    @staticmethod
    def rerep():
        facts = stag_hunt_rerep.qualify(StagHuntAgent.game, 'GameOntologyMt')
        for fact in facts:
            StagHuntAgent.self.insert_to_microtheory("session-reasoner", fact, 'GameOntologyMt')
            print('inserted', fact)
        print('rerep done')


if __name__ == "__main__":
    logger.setLevel(logging.DEBUG)
    AGENT = StagHuntAgent.parse_command_line_args()
    StagHuntAgent.self = AGENT
    # AGENT.insert_to_microtheory("session-reasoner", "(distanceBetween hunter2 hunter3 2)", "GameOntologyMt")


# (achieve :receiver StagHuntAgent :content (task :action (run_sim (2 1 3) 1)))

# (achieve :receiver StagHuntAgent :content (task :action (make_game (2 2 1 2))))
# (achieve :receiver StagHuntAgent :content (task :action (set_goal hunter1 hunter2 stag1)))
# (achieve :receiver StagHuntAgent :content (task :action (set_goal hunter1 nil rabbit1)))
# (achieve :receiver StagHuntAgent :content (task :action (set_astar_goals)))

# (achieve :receiver StagHuntAgent :content (task :action (run_one nil)))
# (achieve :receiver StagHuntAgent :content (task :action (rerep)))


# (achieve :receiver StagHuntAgent :content (task :action (make_shum_game A 1)))
# (achieve :receiver StagHuntAgent :content (task :action (run_shum_one)))

