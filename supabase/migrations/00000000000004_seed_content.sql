update public.site_settings set
  doctor_name = 'Dr. Faslur Rahuman',
  tagline = 'Advancing interventional cardiology through evidence.',
  bio_intro = 'Dr. Faslur Rahuman is a full-time General and Interventional Cardiologist, working at the Colombo South Teaching Hospital and in leading private hospitals in Colombo. He has worked across several hospitals in Sri Lanka, contributing to the development of cardiology units and healthcare services.',
  bio_body = 'His research interest centres on interventional and diagnostic cardiology — exploring innovative solutions, driving evidence-based practice, and pushing the boundaries of current medical treatment. He has published in peer-reviewed journals, presented free papers at local and international forums, and served as a principal investigator for the GMRx2 International Multicenter Randomized Trial on a three-drug combination for hypertension, with most participants from Sri Lanka.',
  photo_url = '/dr-rahuman.png'
where id = 1;

insert into public.publications (title, publisher, year, full_article_url, pdf_url, sort_order) values
('Regulate Exercise ECG Program - Role of Exercise ECG in the Assessment of Coronary Artery Disease in a Tertiary Care Hospital in Sri Lanka', 'Annals of Clinical Case Reports', 2024, 'https://cardiologyresearch.clinsystem.com/', 'https://cardiologyresearch.clinsystem.com/', 1),
('Outcome of early intervention for acute ST elevation myocardial infarction in a tertiary care cardiac centre in Sri Lanka.', 'Ceylon Medical Journal', 2016, 'https://cardiologyresearch.clinsystem.com/', 'https://cardiologyresearch.clinsystem.com/', 2),
('A comparison of rescue and primary percutaneous coronary interventions for acute ST elevation myocardial infarction', 'Indian Heart Journal', 2017, 'https://www.sciencedirect.com/science/article/pii/S0019483217301372', 'https://cardiologyresearch.clinsystem.com/Angioplasty,%20Infarction,%20Reperfusion', 3),
('Clinical Characteristics, Procedural Details, and Outcomes of Patients Who Underwent Percutaneous Coronary Intervention in Real-world Practice at a Tertiary Care Center in Sri Lanka', 'Journal of Indian College of Cardiology', 2023, 'https://journals.lww.com/jicc/fulltext/2023/13040/clinical_characteristics,_procedural_details,_and.6.aspx', 'https://journals.lww.com/jicc/_layouts/15/oaks.journals/downloadpdf.aspx?trckng_src_pg=ArticleViewer&an=02065251-202313040-00006', 4),
('Clinical and Angiographic Pattern of Coronary Artery Disease in a Urban Sri Lankan Population', 'International Journal of Cardiology and Cardiovascular Disorder', 2024, 'https://unisciencepub.com/wp-content/uploads/2024/06/Clinical-and-Angiographic-Pattern-of-Coronary-Artery-Disease-in-a-Urban-Sri-Lankan-Population.pdf', 'https://unisciencepub.com/wp-content/uploads/2024/06/Clinical-and-Angiographic-Pattern-of-Coronary-Artery-Disease-in-a-Urban-Sri-Lankan-Population.pdf', 5);

insert into public.clinical_trials (title, description, link_label, link_url, sort_order) values
('GMRx2 International Multicenter Randomized Trial', 'Principal investigator for a three-drug combination trial for hypertension — encompassing both active-controlled and placebo-controlled arms, with the majority of participants recruited from Sri Lanka.', 'Read in The Lancet', 'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(24)01744-6/abstract', 1);

insert into public.fellowships (title, subtitle, pdf_url, sort_order) values
('Fellow of the American College of Cardiology', 'FACC', 'https://cardiologyresearch.clinsystem.com/resources/fellowship/FACC.pdf', 1);

do $$
declare
  p1 uuid; p2 uuid; p3 uuid; p4 uuid;
begin
  insert into public.presentations (title, presented_at, sort_order)
  values ('Clinical Characteristics, Procedural Details, and Outcomes of Patients Who Underwent Percutaneous Coronary Intervention in Real-World Practice at a Tertiary Care Centre in Sri Lanka', 'Ceylon College of Physicians - 57th Anniversary Annual Academic Sessions 2024', 1)
  returning id into p1;
  insert into public.presentation_links (presentation_id, label, url, sort_order) values
  (p1, 'Show', 'https://docs.google.com/presentation/d/1y-ME7na7-eYgdFM5yqjeb_oHhnbskS6O/edit#slide=id.p1', 1);

  insert into public.presentations (title, presented_at, sort_order)
  values ('Clinical and angiographic pattern of coronary artery disease in a Sri Lankan population', 'Ceylon College of Physicians', 2)
  returning id into p2;
  insert into public.presentation_links (presentation_id, label, url, sort_order) values
  (p2, 'Show', 'https://drive.google.com/file/d/1remGgQm-H_eiCo88klOFPojebma8Cqgh/view', 1);

  insert into public.presentations (title, presented_at, sort_order)
  values ('Outcome of patients undergoing early coronary intervention for the treatment of acute ST elevation myocardial infarction in a tertiary care cardiac centre in Sri Lanka', 'SLMA 2015', 3)
  returning id into p3;
  insert into public.presentation_links (presentation_id, label, url, sort_order) values
  (p3, 'Show', 'https://drive.google.com/file/d/1WH9OzKJqz27jf2cj9yMS7fI-2v5svL1K/view', 1);

  insert into public.presentations (title, presented_at, sort_order)
  values ('Clinical Characteristics, Procedural Details, and Outcomes of Patients Who Underwent Percutaneous Coronary Intervention in Real-world Practice at a Tertiary Care Center in Sri Lanka', '2nd World Congress on May 09-10, 2024 Bangkok, Thailand', 4)
  returning id into p4;
  insert into public.presentation_links (presentation_id, label, url, sort_order) values
  (p4, 'Show', 'https://drive.google.com/file/d/1WH9OzKJqz27jf2cj9yMS7fI-2v5svL1K/view', 1),
  (p4, 'Show', 'https://www.heartcongress.scientexconference.com/pastconference/may2024/gallery#gallery-16', 2),
  (p4, 'Show', 'https://drive.google.com/file/d/11cRmlLkcG-1gv6gMIyKcGATKYB2FbqQP/view', 3),
  (p4, 'Show', 'https://cardiologyresearch.clinsystem.com/fgdfgh', 4);
end $$;
