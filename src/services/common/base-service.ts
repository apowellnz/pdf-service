export default abstract class BaseService {
    protected $env: any;
    protected DB: any;
    constructor(env: any) {
        
        // check required envionement variables. 
        this.$env = env;
        if(!this.$env) {
            throw new Error('no this.$env configed for service')
        }

        this.DB  = this.$env.auctionpresentor
        if(!this.DB) {
            
            throw new Error('no database configed for service')
        }
    }
}