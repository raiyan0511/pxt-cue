""" 
    We created blocks, which has a list of functions to run.
    Currently, the functions are going to be executed sequentially.
    TODO: Add functionality to allow for the control to jump around nodes, like
        when an IF statement is introduced.
"""

from enum import Enum

class BlockName(Enum):
	on_start = "on_start"
	forever = "forever"
	on_button_A = "on_button_A"
	on_button_B = "on_button_B"

class Function:
	def __init__(self, fn_name, args=()):
		self.name = fn_name
		self.args = (args)

class Block:
	def __init__(self, block_name, functions):
		""" functions is a list of Function objects
        """
		self.block_name = block_name
		self.functions = functions

	def create_node_list(self):
        node_list = []
        for fn in self.functions:
            node = Node(fn.name, fn.args)
            node_list.append(node)

        for i in range(len(node_list)-1):
            node_list[i].next_node_idx = i+1

class Node:
    def __init__(self, curr_function, curr_args, next_node_idx):
        self.curr_function = curr_function
        self.current_func_args = args
        self.return_val = None
        self.next_node_idx = next_node_idx

def main():



if __name__== "__main__":
  main()