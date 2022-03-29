
from pythonian import Pythonian
import logging

logger = logging.getLogger('AOC')
logger.setLevel(logging.DEBUG)


class AOC(Pythonian):

    def __init__(self, **kwargs):
        self.name = "Action_and_Observation_Communicator" # This is the name of the agent to register with
        # Call the parent class' constructor
        #super(AOC, self).__init__(**kwargs)

        # converters
        self.to_knowledge = dict()
        self.from_knowledge = dict() # TODO: what do these look like? what do they do?


    def add_to_knowledge_converter(self, name, fn):
        self.to_knowledge[name] = fn

    def add_from_knowledge_converter(self, name, fn):
        self.from_knowledge[name] = fn

    def convert_to_knowledge(self, data, converter=None):
        # facts = self.to_knowledge[converter](data) if converter else [f for converter in self.to_knowledge for
        #                                                               f in self.to_knowledge[converter](data)]
        if converter:
            facts = self.to_knowledge[converter](data)
        else:
            facts = []
            for converter in self.to_knowledge:
                facts += self.to_knowledge[converter](data)
        return facts

    def insert_data(self, receiver, raw_data, wm_only = False, convert = False, converter=None):
        data = (self.convert_to_knowledge(raw_data, converter=converter)[0] if convert else raw_data)
        super().insert_data(receiver, data, wm_only)

    def insert_to_microtheory(self, receiver, raw_data, mt_name, wm_only=False, convert=False, converter=None):
        data = (self.convert_to_knowledge(raw_data, converter=converter)[0] if convert else raw_data)
        super().insert_to_microtheory(receiver, data, mt_name, wm_only)

    def insert_microtheory(self, receiver, raw_data, mt_name, wm_only=False, convert=False, converter=None):
        data = (self.convert_to_knowledge(raw_data, converter=converter) if convert else raw_data)
        super(AOC, self).insert_microtheory(receiver, data, mt_name, wm_only)