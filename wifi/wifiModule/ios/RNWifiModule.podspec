
Pod::Spec.new do |s|
  s.name         = "RNWifiModule"
  s.version      = "1.0.0"
  s.summary      = "RNWifiModule"
  s.description  = <<-DESC
                  RNWifiModule
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNWifiModule.git", :tag => "master" }
  s.source_files  = "RNWifiModule/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  