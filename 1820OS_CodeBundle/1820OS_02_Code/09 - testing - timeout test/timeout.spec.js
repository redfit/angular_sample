describe('Async Greeter test', function () {

  var asyncGreeter, $timeout, $log;
  beforeEach(module('async'));
  beforeEach(inject(function (_asyncGreeterr_, _asyncGreeter_, _$timeout_, _$log_) {
    asyncGreeter = _asyncGreeter_;
    asyncGreeterr = _asyncGreeterr_;
    $timeout = _$timeout_;
    $log = _$log_;
  }));

  it('should greet the async World', function () {
    asyncGreeter.say('World', 9999999999999999999);
    //
    $timeout.flush();
    expect($log.info.logs).toContain(['Hello, World!']);
  });

  it('should greet the async World', function () {
    asyncGreeterr.saye('World', 9999999999999999999);
    //
    $timeout.flush();
    expect($log.info.logs).toContain(['Hello2, World!']);
  });
});
