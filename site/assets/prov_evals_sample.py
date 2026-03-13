# see this for more complete example: https://github.com/etanlightstone-domino/simple_domino_agent/blob/main/prod_eval_simplest_agent.py
from domino.agents.tracing import search_agent_traces
from domino.agents.logging import log_evaluation

AGENT_ID = "69432f1be3cd202576bec1b1"
VERSION = "69b42b68746e4f13257c492b"

# 1. Fetch traces for this agent version
traces = search_agent_traces(
    agent_id=AGENT_ID,
    agent_version=VERSION,
)

# 2. Evaluate each trace and log results
for trace in traces.data:
    inputs = trace.spans[0].inputs
    outputs = trace.spans[0].outputs

    # Replace with your own evaluation logic
    score = my_evaluate(inputs, outputs)

    # 3. Log evaluation results back to the trace
    log_evaluation(
        trace_id=trace.id,
        name="my_eval_metric",
        value=score,
    )