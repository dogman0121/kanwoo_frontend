export type Entity<D = null, C = null, PERM = null, PAG = null, M = null> = {
    data: D,
    context?: C,
    permission?: PERM,
    pagination?: PAG
    metadata?: M
}