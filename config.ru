use Rack::Static,
  :urls => ['/css', '/img', '/js', '/lib', '/fonts', '/partials'],
  :root => 'app'

run lambda { |env|
  [
    200,
    {
      'Content-Type' => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('app/index.html', File::RDONLY)
  ]
 }