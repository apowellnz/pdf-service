export class Process {

    public name: String;

    /**
     * Process that is added to a workflow
     * @param name Name of process
     */
    constructor(name: String) { 
        this.name = name;
    }

    async action(obj: any) {
        console.error('Not implemented');
    }

    validate(obj: any): boolean {
        return true;
    }

    log(message: string, ...params: any[]) {
        console.log(`${this.name}: ${message}`, ...params);
    }
}

export class WorkFlow {
    private processes: Process[];

    constructor(private name: string) {
        this.processes = [];
    }

    add(process: Process) {
        this.processes.push(process);
    }

    async run(dto: any) {
        for (const process of this.processes) {
            try {
                if (process.validate(dto) === undefined) {
                    process.log('Validation Passed');
                    await process.action(dto);
                    process.log('Processing Complete', dto);
                } else {
                    console.warn('Cancelled Workflow', {
                        WorkFlowName: this.name,
                        ProcessName: process.name,
                        error: process.validate(dto),
                    });
                    break;
                }
            } catch (e) {
                console.error({
                    WorkFlowName: this.name,
                    ProcessName: process.name,
                    error: e,
                    stack: e.stack,
                });
                throw e;
            }
        }
        return dto;
    }
}
