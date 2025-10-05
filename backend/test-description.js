import 'dotenv/config';
import { fetchSchemesFromGroq } from './services/groqLLM.js';

async function testDescriptionProcessing() {
  console.log('🧪 Testing Description-Based Scheme Generation...\n');

  const testCases = [
    {
      name: "Farmer seeking crop insurance",
      filters: {
        userDescription: "I am a 30-year-old farmer from Maharashtra. I have 2 acres of land and grow rice and wheat. I need crop insurance to protect against weather damage and want financial support for better seeds and equipment.",
        language: 'en'
      }
    },
    {
      name: "Student needing scholarship",
      filters: {
        userDescription: "I am a 20-year-old engineering student from a poor family. I need scholarship to continue my studies and also looking for skill development programs in technology.",
        language: 'en'
      }
    },
    {
      name: "Woman entrepreneur",
      filters: {
        userDescription: "I am a 28-year-old woman who wants to start a small tailoring business from home. I need a loan and training to start my business.",
        language: 'en'
      }
    },
    {
      name: "Unemployed youth",
      filters: {
        userDescription: "I am a 25-year-old unemployed graduate looking for job opportunities and skill training programs.",
        language: 'en'
      }
    },
    {
      name: "Senior citizen",
      filters: {
        userDescription: "I am a 65-year-old retired person needing healthcare support and pension benefits.",
        language: 'en'
      }
    }
  ];

  for (const testCase of testCases) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🎯 Test Case: ${testCase.name}`);
    console.log(`📝 Description: ${testCase.filters.userDescription}`);
    console.log(`${'='.repeat(60)}`);

    try {
      const schemes = await fetchSchemesFromGroq(testCase.filters);

      console.log(`✅ Generated ${schemes.length} schemes:`);
      schemes.forEach((scheme, index) => {
        console.log(`\n${index + 1}. ${scheme.name}`);
        console.log(`   Category: ${scheme.category}`);
        console.log(`   Department: ${scheme.department}`);
        console.log(`   Relevance: ${scheme.description.substring(0, 100)}...`);
      });

      // Analyze relevance
      const categories = [...new Set(schemes.map(s => s.category))];
      console.log(`\n📊 Analysis:`);
      console.log(`   - Total schemes: ${schemes.length}`);
      console.log(`   - Categories covered: ${categories.length} (${categories.join(', ')})`);
      console.log(`   - Diversity score: ${categories.length >= 3 ? '✅ Good' : '⚠️ Limited'}`);

    } catch (error) {
      console.error(`❌ Test failed: ${error.message}`);
    }

    // Wait between tests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('🎉 Description Processing Tests Complete!');
  console.log(`${'='.repeat(60)}`);
}

testDescriptionProcessing()
  .then(() => {
    console.log('\n✅ All description tests completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Description tests failed:', error.message);
    process.exit(1);
  });