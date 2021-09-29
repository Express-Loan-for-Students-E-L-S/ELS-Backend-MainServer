const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const PROTO_PATH = "api/protos/bank.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const BankService = grpc.loadPackageDefinition(packageDefinition).BankService;


const client = new BankService(
    'localhost:50051',
    grpc.credentials.createInsecure()
)

module.exports = client