# **Agentic AI docs edits**

# Edits for overview page

[https://docs.dominodatalab.com/en/cloud/user\_guide/e437a3/build-and-evaluate-agentic-systems/](https://docs.dominodatalab.com/en/cloud/user_guide/e437a3/build-and-evaluate-agentic-systems/) 

**Build and evaluate agentic systems**

Agentic systems orchestrate LLMs with tools, APIs, and multi-step reasoning to accomplish complex tasks. They range from deterministic workflows (prompt chains, RAG pipelines) to fully autonomous agents that decide their own next steps. Domino supports both ends of this spectrum with the same instrumentation and evaluation infrastructure.

For background on what makes a system agentic and the challenges these systems introduce, see Agentic AI overview.

**The trace: Domino's core abstraction**

The trace is the abstraction that ties everything together. A trace captures the full execution path of an agentic system: every LLM call, tool invocation, decision point, and intermediate output, along with token usage, latency, and cost at each step. Domino builds on MLflow's tracing infrastructure and integrates it into the broader ML lifecycle, connecting traces to project structure, governance workflows, deployment infrastructure, and production monitoring.

**Lifecycle**

Domino provides a complete workflow for developing, experimenting with, deploying, and monitoring agentic systems:

**Develop** Instrument your code to capture traces during execution. A single decorator (`@add_tracing`) works with any major framework — LangChain, OpenAI Agents SDK, Pydantic AI, LlamaIndex — or standalone functions. Traces record every step your system takes, including downstream calls.

**Experiment** Attach evaluations to traces — programmatic metrics, manual labels from SMEs, or ad-hoc batch runs. Compare configurations side by side with trace diffs to see exactly where changes helped or hurt. Export results for analysis and sharing.

**Deploy** Launch your best configuration to production. Domino continues collecting traces from real user interactions automatically, with no gap between development and production observability.

**Monitor** Track performance with production traces. Run evaluations continuously and iterate when accuracy drops, latency spikes, or costs increase. The same trace data that powers debugging provides the audit trail needed for compliance.

These capabilities live inside your project, making it easy for colleagues to review, share, and extend your work. Agentic systems rely on LLM endpoints to process requests and generate responses — see Register and deploy LLMs for setting up that infrastructure.

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# New Conceptual overview page \- “Agentic AI overview”

### Agentic AI overview

**What makes a system "agentic"?**

Most AI applications today are single-turn: a user sends a prompt, a model returns a response, and the interaction ends. These workflows are useful but limited since they can't break down complex problems, call external tools, or course-correct when something goes wrong.

An agentic system changes this by giving an LLM the ability to act autonomously across multiple steps. Rather than responding once and stopping, the system plans a sequence of actions, executes them using tools and APIs, then reflects on whether the results meet the objective. If they don't, it loops back, replanning and retrying until the task is complete or a stopping condition is met. This planning → execution → reflection loop is what distinguishes an agent from a standard AI workflow.

In practice, agentic systems exist on a spectrum. On one end are workflows: systems where LLMs and tools follow predefined code paths, such as prompt chains, RAG pipelines, or evaluator-optimizer patterns. On the other end are autonomous agents, where an LLM dynamically directs its own processes and tool usage, deciding at each step what to do next. Most production systems fall somewhere in between.

The building blocks are similar across the spectrum: an orchestrator that manages the reasoning loop, one or more LLM endpoints that handle generation and decision-making, tool integrations (databases, APIs, code execution), memory or retrieval systems that give the agent access to relevant context, and often multiple specialized agents coordinating with each other. The result is powerful but also significantly harder to debug, evaluate, and trust than a traditional model.

**Why agentic systems create new challenges**

With a conventional ML model, you train on a dataset, evaluate against held-out examples, and deploy a static artifact. The inputs and outputs are well-defined. With agentic systems, the picture is different in several important ways:

**Non-deterministic execution paths.** The same input can produce different sequences of actions depending on model state, tool availability, and intermediate results. You can't evaluate an agent the way you'd evaluate a classifier.

**Compounding errors.** When an agent takes ten steps to complete a task, a mistake at step three can cascade. Understanding where things went wrong requires visibility into every step, not just the final output.

**Prompt and configuration sensitivity.** Small changes to system prompts, tool descriptions, or model selection can dramatically change agent behavior. Teams need a systematic way to compare configurations, not just eyeball outputs.

**Production drift.** Agents in production encounter inputs their developers never anticipated. Without continuous monitoring and evaluation, degradation can go unnoticed, and in multi-agent systems, behavioral drift in one agent can cascade across the entire coordination chain.

**Safety and compliance exposure.** Agentic systems can take real actions such as calling APIs, modifying data, and interacting with users. This makes safety evaluation (hallucination detection, toxicity scoring, policy compliance) as important as quality evaluation. Traditional ML monitoring doesn't cover these dimensions.

## **How Domino addresses these challenges**

Domino treats agentic systems as first-class objects in the ML lifecycle. The core abstraction is the **trace**, a structured record of an agent's full execution path, including every LLM call, tool invocation, and decision point, along with token usage, latency, and cost.

Domino builds on MLflow's tracing infrastructure and integrates it into the broader ML lifecycle, connecting traces to project structure, governance workflows, deployment infrastructure, and production monitoring. This works whether your system is a straightforward RAG pipeline, a prompt chain with validation gates, or a fully autonomous multi-agent system. The same trace format captures all of them.

The result is a single thread of observability that runs from your first prototype through production. Instead of using separate tools to debug during development, evaluate during experimentation, and monitor in production, every phase produces and consumes the same structured data.

To get started, see *Build and evaluate agentic systems* for the full development lifecycle.

**\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_**

# Edits for the tracing page: 

[https://docs.dominodatalab.com/en/cloud/user\_guide/fc1922/develop-agentic-systems/](https://docs.dominodatalab.com/en/cloud/user_guide/fc1922/develop-agentic-systems/) 

**Edit 1: After the paragraph that starts "Domino supports all MLflow auto tracing integrations..."**

Current text:

If you don't use an autolog framework, the traced function will still add a span to an existing trace or create a new one if none is in progress. This lets you capture trace data even when you aren't working with a specific agent framework.

Replace with:

**How span types work.** When you use an autolog framework, MLflow automatically creates typed spans that capture rich, structured data for each step. For example, a LangChain autolog trace will produce `LLM` spans (with token usage, model parameters, and message history), `RETRIEVER` spans (with retrieved documents and source URIs), and `TOOL` spans (with call parameters and results). These typed spans enable filtering, searching, and specialized UI rendering in the Trace Explorer.

If you don't use an autolog framework, `@add_tracing` still creates a span for each decorated function, but the span will be generic — it captures inputs, outputs, and latency, without the structured metadata that typed spans provide. This is useful for capturing the overall execution flow, but for richer observability you can combine `@add_tracing` with MLflow's `@mlflow.trace` decorator on inner functions to manually assign span types and attributes. See [MLflow Manual Tracing](https://mlflow.org/docs/latest/genai/tracing/app-instrumentation/manual-tracing/) for details.

**Edit 2: After the langchain example, add a quick reference**

Add a short note after the two code examples:

**Autolog framework span types.** The following frameworks automatically produce typed spans when passed to `autolog_frameworks`:

| Framework | Span types captured |
| ----- | ----- |
| `langchain` | LLM, TOOL, RETRIEVER, CHAIN, AGENT |
| `openai` | LLM (chat completions, tool calls) |
| `anthropic` | LLM (messages, token usage) |
| `pydantic_ai` | LLM, TOOL |
| `llama_index` | LLM, RETRIEVER, EMBEDDING |

For the full list of supported integrations, see [MLflow Auto Tracing Integrations](https://mlflow.org/docs/3.3.2/genai/tracing/integrations/).

\_\_\_\_\_

# Questions about SDK page:

[https://docs.dominodatalab.com/en/cloud/api\_guide/c5ef26/the-python-domino-library/\#\_agents](https://docs.dominodatalab.com/en/cloud/api_guide/c5ef26/the-python-domino-library/#_agents) 

**Alignment with the Python-Domino SDK** (`domino.agents`)

The SDK reference page reveals several details that should inform (though not necessarily appear verbatim in) your overview.

### **Import path discrepancy**

* **SDK reference page** uses: `from domino.agents.tracing import add_tracing`  
* **Subpage (fc1922)** uses: `from domino.aisystems.tracing import add_tracing`

These are different module paths. If the SDK has been restructured (from `domino.agents` to `domino.aisystems`), the API reference page hasn't been updated yet. 

### **SDK capabilities not reflected in main docs:**

| SDK Feature | Relevance to Overview |
| ----- | ----- |
| `init_tracing()` for production mode | Your deploy section says "Domino continues capturing traces automatically" — but the SDK reveals this requires calling `init_tracing()` with `DOMINO_AGENT_IS_PROD` and `DOMINO_APP_ID` env vars set. Worth noting that production tracing has a specific initialization step. |
| `search_agent_traces()` | Enables searching production traces by agent ID and version. This supports the monitoring narrative — teams can query traces for a specific agent version to investigate issues. |
| `trace_evaluator` parameter on `@add_tracing` | Allows evaluating the *entire trace* (not just individual spans), which is valuable for end-to-end quality checks. Your draft mentions evaluating "at any point in the execution chain" but doesn't distinguish span-level vs. trace-level evaluation. |
| `eagerly_evaluate_streamed_results` | Handles streaming agent outputs — aggregates yielded values into a single span for evaluation. Relevant for chatbot-style agents. |
|  |  |
| `EvaluationResult` and `TraceSummary` data classes | The structured return types for `search_traces()` — useful for programmatic analysis. |
| `custom_summary_metrics` on `DominoRun` | Controls how metrics are aggregated across traces in a run (mean, median, stdev, max, min). Default is mean. |

