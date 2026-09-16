export function PraxisStaticFallback() {
  return (
    <div className="praxis-fallback is-visible" aria-label="Praxis visual architecture fallback">
      <div className="praxis-fallback-head">
        <span>PRAXIS / STORAGE ENGINE</span>
        <span>C++20 / PYTORCH CACHEDDATASET</span>
      </div>
      <div className="praxis-stage-track">
        <span className="active">REQUEST</span>
        <span>HASH LOOKUP</span>
        <span>CACHE HIT</span>
        <span>LRU EVICT</span>
        <span>13X REUSE</span>
      </div>
      <h3 className="praxis-stage-label">MEMORY LOCALITY</h3>
      <p className="praxis-stage-detail">
        Contiguous vector-backed metadata and explicit memory accounting eliminate repeated dataset preprocessing overhead during ML training epochs.
      </p>
    </div>
  );
}
