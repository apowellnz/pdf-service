export default abstract class BaseService {
    protected $env: any;
    constructor(env: any) {
        console.log('passed in env', env);
        // check required envionement variables. 
        this.$env = env;
        if(!this.$env) {
            throw new Error('no this.$env configed for service')
        }
    }
}