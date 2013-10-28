guard 'livereload', :apply_css_live => true, :apply_js_live => false do
  watch(%r{(app/).+\.(html)})
  watch(%r{(app/css).+\.(css)})
  watch(%r{(app/js).+\.(js)})
  watch(%r{(app/partials).+\.(html)})
end

guard 'compass' do
  watch(/^sass\/(.*)\.s[ac]ss/)
end

guard 'coffeescript', :input => 'app/coffeescript', :output => 'app/js', :bare => %w{}
