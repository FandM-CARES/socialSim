import unittest
import run_sim
import models.staghunt_htn

# stag tests

# sim tests

# sim state
## setup start state
## sim
## get back x number states
## states[0] = start state
## final state is different?

class PassTest(unittest.TestCase):

    def get_start_state(self):
        state = models.staghunt_htn.get_start_state()
        state.loc = {('h1', 'hunter'):(4,4), ('s1', 'stag'):(3,4), ('s2', 'stag'):(4,2), ('s3', 'stag'):(1,2), ('h2', 'hunter'):(2,1), ('h3', 'hunter'):(4,3), ('r1', 'rabbit'):(5,3), ('r2', 'rabbit'):(4,1)}
        state.map = run_sim.map5x5x3
        state.goal[('h2', 'hunter')] = {'cooperateWith': (('h2', 'hunter'), ('h3', 'hunter'))}
        state.goal[('h3', 'hunter')] = {'cooperateWith': (('h3', 'hunter'), ('h2', 'hunter'))}
        return state

    def setUp(self):
        pass
        
    def testSimulate_State(self):
        state = self.get_start_state()
        run_sim.assignGoals(state, 4)
        print('**** goals ****', state.goal)
        states,_ = run_sim.simulate_state(state, 3)
        print('**** scores ****', states[-1].score)
        self.assertEqual(len(states), 4)
        self.assertEqual(states[0], state)
        self.assertNotEqual(states[-1], state)

    def testSimulate_State_Goals0(self):
        state = self.get_start_state()
        run_sim.assignGoals(state, 0)
        print('**** goals ****', state.goal)
        states,_ = run_sim.simulate_state(state, 3)
        print('**** scores ****', states[-1].score)
        self.assertEqual(len(states), 4)
        self.assertEqual(states[0], state)
        self.assertNotEqual(states[-1], state)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 0, ('h2', 'hunter'): 1, ('h3', 'hunter'): 1})

    def testSimulate_State_Goals1(self):
        state = self.get_start_state()
        run_sim.assignGoals(state, 1)
        print('**** goals ****', state.goal)
        states,_ = run_sim.simulate_state(state, 3)
        print('**** scores ****', states[-1].score)
        self.assertEqual(len(states), 4)
        self.assertEqual(states[0], state)
        self.assertNotEqual(states[-1], state)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 3, ('h2', 'hunter'): 4, ('h3', 'hunter'): 1})

    def testSimulate_State_Goals2(self):
        state = self.get_start_state()
        run_sim.assignGoals(state, 2)
        print('**** goals ****', state.goal)
        states,_ = run_sim.simulate_state(state, 3)
        print('**** scores ****', states[-1].score)
        self.assertEqual(len(states), 4)
        self.assertEqual(states[0], state)
        self.assertNotEqual(states[-1], state)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 0, ('h2', 'hunter'): 1, ('h3', 'hunter'): 0})

    def testSimulate_State_Goals3(self):
        state = self.get_start_state()
        run_sim.assignGoals(state, 3)
        print('**** goals ****', state.goal)
        states,_ = run_sim.simulate_state(state, 3)
        print('**** scores ****', states[-1].score)
        self.assertEqual(len(states), 4)
        self.assertEqual(states[0], state)
        self.assertNotEqual(states[-1], state)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 1, ('h2', 'hunter'): 3, ('h3', 'hunter'): 3})

    def testSimulate_State_Goals4(self):
        state = self.get_start_state()
        run_sim.assignGoals(state, 4)
        state.loc[('r2', 'rabbit')] = (1,4)
        state.loc[('h2', 'hunter')] = (1,1)
        state.loc[('h3', 'hunter')] = (5,3)
        print('**** goals ****', state.goal)
        states,_ = run_sim.simulate_state(state, 3)
        print('**** scores ****', states[-1].score)
        self.assertEqual(len(states), 4)
        self.assertEqual(states[0], state)
        self.assertNotEqual(states[-1], state)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 2, ('h2', 'hunter'): 2, ('h3', 'hunter'): 2})

    def testStag_noEvasion1(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('h2', 'hunter')] = (3,1)
        state.loc[('h3', 'hunter')] = (4,2)
        run_sim.assignGoals(state, 3)
        states,_ = run_sim.simulate_state(state, 1)
        # stag can't evade, is cornered, thus captured, thus no loc any more
        self.assertNotIn(('s2', 'stag'), states[-1].loc)
        #self.assertEqual(states[-1].loc[('s2', 'stag')], (4,1))

    def testStag_noEvasion2(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (1,5)
        state.loc[('h2', 'hunter')] = (1,4)
        state.loc[('h3', 'hunter')] = (2,5)
        run_sim.assignGoals(state, 3)
        states,_ = run_sim.simulate_state(state, 1)
        # stag can't evade, is cornered, thus captured, thus no loc any more
        self.assertNotIn(('s2', 'stag'), states[-1].loc)
        #self.assertEqual(states[-1].loc[('s2', 'stag')], (1,5))

    def testStag_moveAway1(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('h2', 'hunter')] = (2,1)
        state.loc[('h3', 'hunter')] = (4,2)
        run_sim.assignGoals(state, 3)
        states,_ = run_sim.simulate_state(state, 1)
        self.assertEqual(states[-1].loc[('s2', 'stag')], (3,1))

    def testStag_moveAway2(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('h2', 'hunter')] = (3,1)
        state.loc[('h3', 'hunter')] = (4,3)
        run_sim.assignGoals(state, 3)
        states,_ = run_sim.simulate_state(state, 1)
        self.assertEqual(states[-1].loc[('s2', 'stag')], (4,2))

    def testCapture2Hunters(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('h2', 'hunter')] = (3,1)
        state.loc[('h3', 'hunter')] = (4,2)
        run_sim.assignGoals(state, 3)
        states,_ = run_sim.simulate_state(state, 1)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 0, ('h2', 'hunter'): 3, ('h3', 'hunter'): 3})

    def testCapture3Hunters1(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('h1', 'hunter')] = (4,1)
        state.loc[('h2', 'hunter')] = (3,1)
        state.loc[('h3', 'hunter')] = (4,2)
        run_sim.assignGoals(state, 4)
        states,_ = run_sim.simulate_state(state, 1)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 2, ('h2', 'hunter'): 2, ('h3', 'hunter'): 2})

    def testCapture3Hunters2(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('h2', 'hunter')] = (4,1)
        state.loc[('h3', 'hunter')] = (3,1)
        state.loc[('h1', 'hunter')] = (4,2)
        run_sim.assignGoals(state, 4)
        states,_ = run_sim.simulate_state(state, 1)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 2, ('h2', 'hunter'): 2, ('h3', 'hunter'): 2})

    def testCapture3Hunters3(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('h3', 'hunter')] = (4,1)
        state.loc[('h1', 'hunter')] = (3,1)
        state.loc[('h2', 'hunter')] = (4,2)
        run_sim.assignGoals(state, 4)
        states,_ = run_sim.simulate_state(state, 1)
        print(states[1].score)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 2, ('h2', 'hunter'): 2, ('h3', 'hunter'): 2})

    def testCapture3Hunters1Missing(self):
        pass

    def testDecideEveryManForThemselves(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (1,5)
        run_sim.decide(state)
        print('**** goals ****', state.goal)
        self.assertFalse(state.goal)


    def testDecideAllWorkTogether(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('r2', 'rabbit')] = (5,5)
        state.loc[('h3', 'hunter')] = (4,1)
        state.loc[('h1', 'hunter')] = (3,1)
        state.loc[('h2', 'hunter')] = (4,2)
        run_sim.decide(state)
        print('**** goals ****', state.goal)
        self.assertTrue(state.goal)
        # if they all have goals, they are effectively working together, even if they don't know it
        self.assertIn(('h1', 'hunter'), state.goal)
        self.assertIn(('h2', 'hunter'), state.goal)
        self.assertIn(('h3', 'hunter'), state.goal)


    def testSimulateStateDecide(self):
        state = self.get_start_state()
        states,_ = run_sim.simulate_state(state, 1, run_sim.decide)
        print('**** scores ****', states[-1].score)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 0, ('h2', 'hunter'): 0, ('h3', 'hunter'): 0})
        ###
        state = states[-1]
        states,_ = run_sim.simulate_state(state, 1, run_sim.decide)
        print('**** scores ****', states[-1].score)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 1, ('h2', 'hunter'): 3, ('h3', 'hunter'): 3})
        ###
        state = states[-1]
        states,_ = run_sim.simulate_state(state, 1, run_sim.decide)
        print('**** scores ****', states[-1].score)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 1, ('h2', 'hunter'): 4, ('h3', 'hunter'): 3})
        last = states[-1]
        ###
        state = self.get_start_state()
        states,_ = run_sim.simulate_state(state, 3, run_sim.decide)
        print('**** scores ****', states[-1].score)
        self.assertEqual(states[-1].score, {('h1', 'hunter'): 1, ('h2', 'hunter'): 4, ('h3', 'hunter'): 3})
        self.assertEqual(states[-1].loc, last.loc)
        self.assertEqual(states[-1].goal, last.goal)
        

    def testAssumesForDecideEveryManForThemselves(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (1,5)
        run_sim.decide(state)
        print('**** assumes ****', state.assumes)
        self.assertNotIn(('h1', 'hunter'), state.assumes[('h1', 'hunter')])
        self.assertNotIn(('h2', 'hunter'), state.assumes[('h2', 'hunter')])
        self.assertNotIn(('h3', 'hunter'), state.assumes[('h3', 'hunter')])


    def testAssumesForDecideAllWorkTogether(self):
        state = self.get_start_state()
        state.loc[('s2', 'stag')] = (4,1)
        state.loc[('r2', 'rabbit')] = (5,5)
        state.loc[('h3', 'hunter')] = (4,1)
        state.loc[('h1', 'hunter')] = (3,1)
        state.loc[('h2', 'hunter')] = (4,2)
        run_sim.decide(state)
        # test above verifies that all hunters have a goal
        print('**** assumes ****', state.assumes)
        self.assertEqual(state.goal[('h1', 'hunter')], state.assumes[('h1', 'hunter')][('h1', 'hunter')])
        self.assertEqual(state.goal[('h2', 'hunter')], state.assumes[('h2', 'hunter')][('h2', 'hunter')])
        self.assertEqual(state.goal[('h3', 'hunter')], state.assumes[('h3', 'hunter')][('h3', 'hunter')])


    def testRunOneSim(self):
        states,_ = run_sim.run_one((0,0,0))
        print(states[-1].score)
        for i in range(len(states)):
            print('loc', i, states[i].loc)
            print('goals', i, states[i].goal)
            print('score', i, states[i].score)



if __name__ == '__main__':
    unittest.main()
