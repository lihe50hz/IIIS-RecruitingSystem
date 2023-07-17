export function readConfig() {
    const outcome = {} as any
    try {
        //        var env = window.location.host.split('.')[1]
        outcome.hubURL = `http://localhost:6080`
    } catch (error) {
        alert('alerting:' + error)
    }
    return outcome
}

export const config = readConfig()
