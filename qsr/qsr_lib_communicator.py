import logging

from qsrlib.qsrlib import QSRlib, QSRlib_Request_Message
from qsrlib_io.world_trace import Object_State, World_Trace, \
    World_State  # might also need WorldState if adding individuals
# shouldn't need to import individual qsrs directly; should be handled in messages

from aoc import AOC

LOGGER = logging.getLogger('QSRLibCom')
LOGGER.setLevel(logging.DEBUG)


class QSRLibCommunicator(AOC):
    def __init__(self, **kwargs):
        self.name = "QSRLibCommunicator"  # TODO: possibly need to put this after the super constructor
        super(QSRLibCommunicator, self).__init__(**kwargs)

        self.add_asks()
        self.add_achieves()
        self.add_to_knowledge_converters()
        self.add_from_knowledge_converters()

        self.qsrs = list()
        self.objects = list() # TODO: should probably be handled by dynamic_args
        self.object_pairs = list() # TODO: should probably be handled by dynamic_args
        self.dynamic_args = dict()

        self.conversion_dict = {'rcc8': {'po': 'rcc8-PO', 'ec': 'rcc8-EC', 'eq': 'rcc8-EQ', 'ntpp': 'rcc8-NTPP',
                                         'ntppi': 'rcc8-NTPPi', 'tpp': 'rcc8-TPP', 'tppi': 'rcc8-TPPi',
                                         'dc': 'rcc8-DC'},
                                # end rcc8
                                'argd': {'same': 'sameLocation', 'close': 'close', 'far': 'far'},
                                # end argd
                                'cardir': {'n': 'northOf', 's': 'southOf', 'eq': 'sameLocation', 'e': 'eastOf',
                                           'w': 'westOf',
                                           'ne': 'northEastOf', 'nw': 'northWestOf', 'se': 'southEastOf',
                                           'sw': 'southWestOf'},
                                # end cardir
                                'mos': {'s': 'stationary', 'm': 'moving'},
                                # end mos
                                'qtcbcs': {'0,-': ('stationary', 'movesAway', 'farther'),
                                           '-,0': ('movesAway', 'stationary', 'farther'),
                                           '0,+': ('stationary', 'movesToward', 'closer'),
                                           '+,0': ('movesToward', 'stationary', 'closer'),
                                           '-,-': ('movesAway', 'movesAway', 'farther'),
                                           '+,+': ('movesToward', 'movesToward', 'closer'),
                                           '0,0': ('stationary', 'stationary', 'sameDistance'),
                                           '-,+': ('movesAway', 'movesToward', 'sameDistance'),
                                           # NB: questionable for some domains
                                           '+,-': ('movesToward', 'movesAway', 'sameDistance')
                                           # NB: questionable for some domains
                                           }
                                # end qtcbcs
                                }

        self.include_all_stationary = False # when True, duplicates qtcbs stationary with mos stationary
        self.microtheory = "QSRLibFactsMt"

    def add_asks(self):
        pass

    def add_achieves(self):
        pass

    def add_from_knowledge_converters(self):
        pass

    def add_to_knowledge_converters(self):
        self.add_to_knowledge_converter("qsr", self.get_qsr_facts)
        # maybe put more stuff here

    ############################### converters ###############################

    def get_qsr_facts(self, response_msg):
        #object_keys = self.get_object_keys()

        qsr_world_trace_qsrs = response_msg.qsrs.get_for_qsrs(self.qsrs)
        #qsr_world_trace = qsr_world_trace_qsrs.get_for_objects(object_keys) # TODO: should probably be handled by dynamic_args

        qsr_trace = qsr_world_trace_qsrs.trace
        timestamps = qsr_world_trace_qsrs.get_sorted_timestamps()

        world_qsr_states = [qsr_trace[timestamp] for timestamp in timestamps]
        qsr_states = [(obj, state.qsrs[obj]) for state in world_qsr_states for obj in state.qsrs]

        facts = [self.to_sexp(state.qsr, state.timestamp, obj, q) for (obj, state) in qsr_states for q in state.qsr if
                 self.to_sexp(state.qsr, state.timestamp, obj, q) != ""]
        return facts

    def to_sexp(self, data, timestamp, obj, qsr):
        fact=""
        rel = self.conversion_dict[qsr][data[qsr]]
        if qsr == 'mos':
            if self.include_all_stationary or rel != 'stationary':
                fact = "(ist-Information {} (observesAt {} ({} {}) {}))".format(self.microtheory, self.name, rel, obj,
                                                                                timestamp)
        elif qsr == 'qtcbcs':
            rel1, rel2, rel3 = rel
            o1, o2 = obj.split(',')
            rel1_string = "({} {})".format(rel1, o1) if rel1=='stationary' else "({} {} {})".format(rel1, o1, o2)
            rel2_string = "({} {})".format(rel2, o2) if rel2 == 'stationary' else "({} {} {})".format(rel2, o1, o2)
            fact = "(ist-Information {} (observesAt {} (causes-PropProp (and " \
                   "{} {}) " \
                   "({} {} {})) {}))".format(self.microtheory, self.name, rel1_string, rel2_string, rel3, o1, o2,
                                             timestamp)
        else:
            o1, o2 = obj.split(',')
            fact = "(ist-Information {} (observesAt {} ({} {} {}) {}))".format(self.microtheory, self.name, rel, o1,
                                                                               o2, timestamp)
        return fact

    ############################### helpers ###############################

    def get_object_keys(self):
        objects = []
        if 'mos' in self.qsrs:
            objects += self.objects
        if any(qsr != 'mos' for qsr in self.qsrs):
            objects += self.object_pairs
        return objects


def test(which_qsr):
    # adapted from mwe.py
    # ****************************************************************************************************
    # create a QSRlib object if there isn't one already
    qsrlib = QSRlib()

    # make some input data
    world = World_Trace()
    o1 = [Object_State(name="o1", timestamp=0, x=1., y=1., xsize=5., ysize=8.),
          Object_State(name="o1", timestamp=1, x=1., y=1., xsize=5., ysize=8.),
          Object_State(name="o1", timestamp=2, x=1., y=1., xsize=5., ysize=8.),
          ]#Object_State(name="o1", timestamp=3, x=1., y=3., xsize=5., ysize=8.)]

    o2 = [Object_State(name="o2", timestamp=0, x=0., y=2., xsize=5., ysize=8.),
          Object_State(name="o2", timestamp=1, x=2., y=2., xsize=5., ysize=8.),
          Object_State(name="o2", timestamp=2, x=2., y=2., xsize=5., ysize=8.),
          ]#Object_State(name="o2", timestamp=3, x=2., y=0., xsize=5., ysize=8.)]

    o3 = [Object_State(name="o3", timestamp=0, x=3., y=3., xsize=5.2, ysize=8.5),
          Object_State(name="o3", timestamp=1, x=3., y=3., xsize=5.2, ysize=8.5),
          Object_State(name="o3", timestamp=2, x=3., y=3., xsize=5.2, ysize=8.5)]

    world.add_object_state_series(o1)
    world.add_object_state_series(o2)
    world.add_object_state_series(o3)

    dynamic_args = {"tpcc": {"qsrs_for": [("o1", "o2", "o3")]},
                    "argd": {"qsr_relations_and_values": {"close": 1.0, "far": 10.0}},
                    "qtcbcs": {"quantisation_factor": 0.0, "distance_threshold":0.0, "validate":False, "no_collapse":True}
                    }

    # the actual test:
    comm = QSRLibCommunicator()
    comm.qsrs = which_qsr
    comm.objects = ["o1", "o2", "o3"]
    comm.object_pairs = ["o1,o2", "o1,o3", "o2,o3"]

    qsrlib_request_message = QSRlib_Request_Message(which_qsr, world, dynamic_args)
    qsrlib_response_message = qsrlib.request_qsrs(req_msg=qsrlib_request_message)

    facts = comm.get_qsr_facts(qsrlib_response_message)
    print(facts)


test(["qtcbcs"])
